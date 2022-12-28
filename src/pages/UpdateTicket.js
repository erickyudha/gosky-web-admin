import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import Alert from '../components/Alert';
import LoadingScreen from '../components/LoadingScreen';
import TicketForm from '../components/TicketForm';
import './crud.css';

export default function UpdateTicket(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [alertActive, setAlertActive] = useState(true);
  const [alert, setAlert] = useState({});
  const [ticket, setTicket] = useState({});
  const [image, setImage] = useState('');
  const [cookies, setCookie] = useCookies(['accessToken', 'event']);
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState('');

  const handleFormChange = (data, image) => {
    setImage(image);
    setTicket(data);
  };

  const activateAlert = () => {
    setAlertActive(true);
    setTimeout(() => {
      setAlertActive(false);
    }, 3000);
  }

  const uploadImage = async (image) => {
    const url = 'https://gosky.up.railway.app/api/images?type=TICKET_IMG';
    const form = new FormData();
    form.append('image', image);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.accessToken,
      },
      body: form,
    })
    const body = await response.json();
    return body.data;
  }

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      let imageData = {}
      if (!!image) {
        imageData = await uploadImage(image);
      }
      const data = {
        ...ticket,
        ...imageData,
      };
      data.category = (data.category === 'ONE WAY') ? 'ONE_WAY' : 'ROUND_TRIP';

      const url = 'https://gosky.up.railway.app/api/tickets';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + cookies.accessToken,
        },
        body: JSON.stringify(data),
      });
      const body = await response.json();
      if (body.status !== 'success') {
        throw new Error(body.message);
      } else {
        const event = {
          type: 'alert',
          alert: {
            type: 'success',
            message: 'Add New Ticket Success',
          }
        };
        setCookie('event', event, { path: '/' });
        navigate('/dashboard/tickets');
      }

    } catch (error) {
      setIsLoading(false);
      setAlert({
        type: 'danger',
        message: 'Error: ' + error.message,
      })
      activateAlert();
    }
  }

  useEffect(() => {
    const getTicketData = async () => {
      try {
        const url = 'https://gosky.up.railway.app/api/tickets/' + id;
        const response = await fetch(url, {
          method: 'GET'
        });
        const body = await response.json();
        if (body.status !== 'success') {
          throw new Error(body.message);
        } else {
          setTicket(body.data);
        }
      } catch (error) {
        setTicket(null);
        setError(error.message);
      }
    }
    getTicketData();
  }, [])

  return (
    <div className='crud-section'>
      <Alert active={alertActive} type={alert.type} message={alert.message} />
      <LoadingScreen active={isLoading} />
      {(error) ? <h1 className="crud-header">Error: {error}</h1> : 
        <>
          <h1 className="crud-header">Update Ticket Data</h1>
          <div>
            <div className='ticket-preview'>
              <div className='pair'>
                <span>ID</span>
                <span>{ticket.id}</span>
              </div>
              
            </div>
            <TicketForm onChange={handleFormChange} />
            <button className='form-btn' onClick={handleCreate}>Create</button>
          </div>
        </>
      }
    </div>
  )
}