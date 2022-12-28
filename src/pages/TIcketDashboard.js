import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TicketCard from '../components/TicketCard';
import './TicketDashboard.css';

export default function TicketDashboard() {
  const [cookies, setCookie] = useCookies(['accessToken', 'user']);
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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
  }, [])

  return (
    <>
      <header>
        <span>Ticket Management</span>

        <div>
          <button>Create</button>
        </div>
      </header>
      
      <main>
        {tickets.map((ticket) => {
          return <TicketCard ticket={ticket} key={ticket.id} />
        })}
      </main>
    </>  
  )
}