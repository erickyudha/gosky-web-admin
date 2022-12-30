import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import Alert from '../components/Alert';
import LoadingScreen from '../components/LoadingScreen';
import TicketForm from '../components/TicketForm';
import TicketPreview from '../components/TicketPreview';
import './crud.css';

export default function UpdateTicket(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [alertActive, setAlertActive] = useState(true);
  const [alert, setAlert] = useState({});
  const [ticket, setTicket] = useState({});
  const [ticketRef, setTicketRef] = useState({});
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
  };

  const handleDeleteImg = async (imageId) => {
    const url =
      `https://gosky.up.railway.app/api/images?imageId=${imageId}&type=TICKET_IMG`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + cookies.accessToken,
      },
    });
    await response.json();
  };

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

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      let imageData = {}
      if (!!image) {
        await handleDeleteImg(ticketRef.imageId);
        imageData = await uploadImage(image);
      }
      const data = {
        ...ticket,
        ...imageData,
      };
      data.category = (data.category === 'ONE WAY') ? 'ONE_WAY' : 'ROUND_TRIP';

      const url = 'https://gosky.up.railway.app/api/tickets/' + id;
      const response = await fetch(url, {
        method: 'PUT',
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
            message: 'Update Ticket Data Success',
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
    document.title = 'Update Ticket - GoSky Admin'; 
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
          setTicketRef(body.data);
        }
      } catch (error) {
        setTicket({});
        setError(error.message);
      }
    }
    getTicketData();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [])

  return (
    <div className='crud-section'>
      <Alert active={alertActive} type={alert.type} message={alert.message} />
      <LoadingScreen active={isLoading} />
      {(error) ? <h1 className="crud-header">Error: {error}</h1> : 
        <>
          <h1 className="crud-header">Update Ticket Data</h1>
          <div>
            <TicketPreview ticket={ticketRef} />
            <TicketForm onChange={handleFormChange} ticket={ticketRef} />
            <button className='form-btn' onClick={handleUpdate}>Update</button>
          </div>
        </>
      }
    </div>
  )
}