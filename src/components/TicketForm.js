import { useEffect, useState } from "react";

export default function TicketForm(props) {
  const { ticket = {}, onChange } = props;
  const [category, setCategory] = useState(ticket.category || 'ONE WAY');
  const [from, setFrom] = useState(ticket.from || 'JAKARTA');
  const [to, setTo] = useState(ticket.to || 'MEDAN');
  const [price, setPrice] = useState(ticket.price || '');
  const [duration, setDuration] = useState(ticket.duration || '');
  const [departureTime, setDepartureTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [description, setDescription] = useState(ticket.description || '');
  const [image, setImage] = useState('');
  
  if (!!ticket.departureTime) setDepartureTime(new Date(ticket.departureTime).toISOString().slice(0, 16));
  if (!!ticket.returnTime) setDepartureTime(new Date(ticket.returnTime).toISOString().slice(0, 16));

  useEffect(() => {
    const data = {
      category, from, to, price, duration,
      departureTime, returnTime, description
    }
    onChange(data, image);
  }, [category, from, to, price, duration, departureTime, returnTime, description, image])

  const cities = [
    'JAKARTA',
    'DENPASAR',
    'YOGYAKARTA',
    'SURABAYA',
    'MEDAN',
    'SOLO',
    'SEMARANG',
    'PADANG',
    'MAKASSAR',
    'PONTIANAK',
    'BANJARMASIN',
    'PALEMBANG',
    'BANDUNG',
    'JAYAPURA',
  ];

  return (
    <div className="ticket-form">
      <div className="pair">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option>ONE WAY</option>
          <option>ROUND TRIP</option>
        </select>
      </div>
      <div className="row">
        <div className="pair">
          <label>From</label>
          <select
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
            }}
          >
            {cities.map((city) => <option key={'from_' + city}>{city}</option>)}
          </select>
        </div>
        <div className="pair">
          <label>To</label>
          <select
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
            }}
          >
            {cities.map((city) => <option key={'to_' + city}>{city}</option>)}
          </select>
        </div>
      </div>
      <div className="pair">
        <label>Price</label>
        <input
          placeholder="Price"
          type='number'
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        ></input>
      </div>
      <div className="pair">
        <label>Duration</label>
        <input
          placeholder="Duration"
          type='number'
          onChange={(e) => {
            setDuration(e.target.value);
          }}
          value={duration}
        ></input>
      </div>
      <div className="pair">
        <label>Departure Time</label>
        <input
          placeholder="Departure Time"
          type='datetime-local'
          value={departureTime}
          onChange={(e) => {
            setDepartureTime(e.target.value);
          }}
        ></input>
      </div>
      {(category === 'ROUND TRIP') ?
      <div className="pair">
        <label>Return Time</label>
          <input
            placeholder="Return Time"
            type='datetime-local'
            value={returnTime}
            onChange={(e) => {
              setReturnTime(e.target.value);
            }}
          ></input>
      </div> : ''
      }
      <div className="pair">
        <label>Description</label>
        <textarea
          placeholder="Description"
          cols={10}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        >
        </textarea>
      </div>
      <div className="pair">
        <label>Image</label>
        <input
          type='file'
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}></input>
      </div>
    </div>
  )
}