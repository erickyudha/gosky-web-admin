import { useState } from 'react';
import DeleteConfirm from './DeleteConfirm';
import './TicketCard.css';
import LoadingScreen from '../components/LoadingScreen';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

export default function TicketCard(props) {
  const { ticket, deleteHandler } = props;
  const [confirmActive, setConfirmActive] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();


  const handleShowConfirm = () => {
    setConfirmActive(true);
  }

  const handleHideConfirm = () => {
    setConfirmActive(false);
  }
  const handleDelete = async () => {
    setConfirmActive(false);
    setLoadingActive(true);

    try {
      const url = 'https://gosky.up.railway.app/api/tickets/' + ticket.id;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + cookies.accessToken,
        }
      })
      const body = await response.json();

      if (body.status !== 'success') {
        throw new Error(body.message);
      } else {
        const alert = {
          type: 'success',
          message: 'Delete Ticket Success',
        };
        deleteHandler(ticket.id, alert);
      }
    } catch (error) {
      const alert = {
        type: 'danger',
        message: 'Error: ' + error.message,
      };
      deleteHandler(ticket.id, alert);
    } finally {
      setLoadingActive(false);
    }
  }

  return (
    <div className="ticketCard">
      <LoadingScreen active={loadingActive} />
      <DeleteConfirm
        active={confirmActive}
        message='Are you sure you want to delete this ticket?'
        cancelHandler={handleHideConfirm}
        deleteHandler={handleDelete}
      />
      <img alt='ticket' src={ticket.imageUrl}></img>

      <div className="content">
        <div className="row-1">
          <span>{(ticket.category === 'ONE_WAY') ? 'ONE WAY' : 'ROUND TRIP'}</span>
          <span data-testid='tc-fn'>{ticket.flightNumber}</span>
        </div>
        <span className='destination'>{`${ticket.from}-${ticket.to}`}</span>
        <div className='pair'>
          <img alt='price' className='cardIcon' src='/price_icon.svg'></img>
          <span>Rp{ticket.price}</span>
        </div>
        <div className='pair'>
          <img alt='departure' className='cardIcon' src='/departure_icon.svg'></img>
          <span>{new Date(ticket.departureTime).toLocaleString()}</span>
        </div>
        {(ticket.category === 'ROUND_TRIP') ?
          <div className='pair'>
            <img alt='return' className='cardIcon' src='/return_icon.svg'></img>
            <span>{new Date(ticket.returnTime).toLocaleString()}</span>
          </div>
          : ''
        }
        <div className='pair'>
          <img alt='duration' className='cardIcon' src='/duration_icon.svg'></img>
          <span>{ticket.duration} Minutes</span>
        </div>
      </div>

      <div className='control'>
        <button data-testid='tc-edit-btn' className='editBtn' onClick={() => navigate('/dashboard/tickets/update/' + ticket.id)}>Edit</button>
        <button data-testid='tc-del-btn' className='deleteBtn' onClick={handleShowConfirm}>Delete</button>
      </div>
    </div>
  )
}