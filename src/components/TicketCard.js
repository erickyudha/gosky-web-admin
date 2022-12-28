import './TicketCard.css';

export default function TicketCard(props) {
  const { ticket } = props;

  return (
    <div className="ticketCard">
      <img alt='ticket' src={ticket.imageUrl}></img>

      <div className="content">
        <div className="row-1">
          <span>{(ticket.category === 'ONE_WAY') ? 'ONE WAY' : 'ROUND TRIP'}</span>
          <span>{ticket.flightNumber}</span>
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
        <button className='editBtn'>Edit</button>
        <button className='deleteBtn'>Delete</button>
      </div>
    </div>
  )
}