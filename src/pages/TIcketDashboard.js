import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert';
import TicketCard from '../components/TicketCard';
import './TicketDashboard.css';

export default function TicketDashboard() {
  const [cookies, setCookie] = useCookies(['accessToken', 'user', 'event']);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [alert, setAlert] = useState({ type: 'success', message: 'Delete ticket success' });
  const [alertActive, setAlertActive] = useState(false);

  const activateAlert = () => {
    setAlertActive(true);
    setTimeout(() => {
      setAlertActive(false);
    }, 3000);
  }
  
  const handleDelete = (ticketId, alert) => {
    setAlert(alert);
    activateAlert();

    if (alert.type === 'success') {
      setTickets(oldTickets => {
        return oldTickets.filter((ticket) => {
          return ticket.id !== ticketId
        });
      });
    }
  }

  useEffect(() => {
    const fetchTickets = async () => {
      const url = 'https://gosky.up.railway.app/api/tickets'
      fetch(url, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((body) => {
          setTickets(body.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    
    fetchTickets();

    if (!!cookies.event) {
      if (cookies.event.type === 'alert') {
        setAlert(cookies.event.alert);
        activateAlert();
        setCookie('event', null, { path: '/' });
      }
    }
  }, [])

  return (
    <div className='ticket-db-main'>
      <header className='ticketHeader'>
        <h1>Ticket Management</h1>

        <div>
          <button onClick={() => {
            navigate('/dashboard/tickets/create');
          }}>Create</button>
        </div>
      </header>
      
      <div className='ticket-list'>
        {tickets.map((ticket) => {
          return <TicketCard ticket={ticket} key={ticket.id} deleteHandler={handleDelete} />
        })}
      </div>
      <Alert
        active={alertActive}
        type={alert.type}
        message={alert.message}
      />
    </div>  
  )
}