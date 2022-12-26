import { useEffect, useState } from 'react';
import TicketCard from '../components/TicketCard';
import './TicketDashboard.css';

export default function TicketDashboard() {
  const [tickets, setTickets] = useState([]);
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