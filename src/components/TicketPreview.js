import { useEffect, useState } from "react";

export default function TicketPreview(props) {
  const { ticket = {} } = props;
  const [creator, setCreator] = useState({});
  const [updater, setUpdater] = useState({});

  const getUserById = async (id) => {
    try {
      const url = 'https://gosky.up.railway.app/api/users/' + id;
      const response = await fetch(url);
      const body = await response.json();
      if (body.status !== 'success') {
        throw new Error();
      } else {
        return body.data;
      }
    } catch (error) {
      return {
        name: '-  '
      }
    };
  };

  useEffect(() => {
    const getData = async () => {
      const user1 = await getUserById(ticket.createdBy)
      const user2 = await getUserById(ticket.updatedBy)
      setCreator(user1);
      setUpdater(user2);
    };
    if (!!ticket.createdBy || !!ticket.updatedBy) {
      getData();
    }
  }, [ticket])

  return (
    <div className='ticket-preview'>
      <div className='pair'>
        <span>ID</span>
        <span>{ticket.id}</span>
      </div>
      <div className='pair'>
        <span>Filght Number</span>
        <span>{ticket.flightNumber}</span>
      </div>
      <div className='pair'>
        <span>Created By</span>
        <span>{creator.name}</span>
      </div>
      <div className='pair'>
        <span>Created At</span>
        <span>{new Date(ticket.createdAt).toLocaleString()}</span>
      </div>
      <div className='pair'>
        <span>Updated By</span>
        <span>{updater.name}</span>
      </div>
      <div className='pair'>
        <span>Updated At</span>
        <span>{new Date(ticket.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  )
}