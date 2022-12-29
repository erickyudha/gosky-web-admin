import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert';
import FormFilter from '../components/FormFilter';
import LoadingScreen from '../components/LoadingScreen';
import TicketCard from '../components/TicketCard';
import './TicketDashboard.css';

export default function TicketDashboard() {
  const [cookies, setCookie] = useCookies(['accessToken', 'user', 'event']);
  const [tickets, setTickets] = useState([]);
  const [viewTickets, setViewTickets] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [alert, setAlert] = useState({ type: 'success', message: 'Delete ticket success' });
  const [alertActive, setAlertActive] = useState(false);
  const [pageArr, setPageArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const TICKET_PER_PAGE = 10;

  const activateAlert = () => {
    setAlertActive(true);
    setTimeout(() => {
      setAlertActive(false);
    }, 3000);
  }

  const fetchTickets = async (filter) => {
    setIsLoading(true);
    let url = 'https://gosky.up.railway.app/api/tickets?'
    if (!!filter) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(filter)) {
        params.set(key, value);
      };
      url += params.toString();
    };
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((body) => {
        const tickets = body.data;
        tickets.sort((a, b) => a.id - b.id);
        setTickets(tickets);
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const resetFilterHandler = () => {
    setIsFiltering(false);
    fetchTickets(null);
  }

  const filterHandler = (filter) => {
    setIsFiltering(false);
    fetchTickets(filter);
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
    fetchTickets(null);

    if (!!cookies.event) {
      if (cookies.event.type === 'alert') {
        setAlert(cookies.event.alert);
        activateAlert();
        setCookie('event', null, { path: '/' });
      }
    }
  }, [])

  useEffect(() => {
    if (!searchParams.get('page')) {
      if (tickets.length > TICKET_PER_PAGE) {
        setSearchParams({ page: 1 });
      } else {
        setViewTickets(tickets);
      }
    } else {
      if (parseInt(searchParams.get('page')) > Math.ceil(tickets.length / TICKET_PER_PAGE)) {
        setSearchParams({
          page: 1
        })
      } else {
        const page = searchParams.get('page');
        setViewTickets(tickets.slice(TICKET_PER_PAGE * (page - 1), TICKET_PER_PAGE * page));

        const maxPage = Math.ceil(tickets.length / TICKET_PER_PAGE);
        const pageList = [];
        const floor = ((page - 4) < 1) ? 1 : (page - 4);
        const ceil = ((4 + parseInt(page)) > maxPage) ? maxPage : (4 + parseInt(page));
        for (let i = floor; i <= ceil; i++) {
          pageList.push(i);
        };
        setPageArr(pageList);
      }
    }
  }, [tickets, searchParams, setSearchParams]);

  return (
    <div className='ticket-db-main'>
      <header className='ticketHeader'>
        <h1>Ticket Management</h1>
        <div>
          <button
            className='filter-btn'
            onClick={() => {setIsFiltering(true)}}
          >Filter</button>
          <button onClick={() => {
            navigate('/dashboard/tickets/create');
          }}>Create</button>
        </div>
      </header>
      <div className='page-button-list'>
        {(parseInt(searchParams.get('page')) === 1) ? '' :
          <>
            <button
              className='page-arrow'
              onClick={() => {setSearchParams({page: 1})}}
            >
              <img src='/dbl_left_arrow.svg' alt='to start' />
            </button>
            <button
              className='page-arrow'
              onClick={() => { setSearchParams({page: parseInt(searchParams.get('page')) - 1})}}
            >
              <img src='/left_arrow.svg' alt='to prev' />
            </button>
          </>
        }
        {pageArr.map((x) => {
          return <button
            className={(x === parseInt(searchParams.get('page'))) ? 'active' : ''}
            onClick={(e) => {
              setSearchParams({
                page: x
              })
            }}
          >{x}</button>
        })
        }
        {(parseInt(searchParams.get('page')) === Math.ceil(tickets.length / TICKET_PER_PAGE)) ? '' :
          <>
            <button
              className='page-arrow'
              onClick={() => { setSearchParams({ page: parseInt(searchParams.get('page')) + 1 }) }}
            >
              <img src='/right_arrow.svg' alt='to prev' />
            </button>
            <button
              className='page-arrow'
              onClick={() => { setSearchParams({ page: Math.ceil(tickets.length / TICKET_PER_PAGE)})}}
            >
              <img src='/dbl_right_arrow.svg' alt='to start' />
            </button>
          </>
        }
      </div>
      <div className='ticket-list'>
        {viewTickets.map((ticket) => {
          return <TicketCard ticket={ticket} key={ticket.id} deleteHandler={handleDelete} />
        })}
      </div>
      
      <LoadingScreen active={isLoading} />
      <FormFilter
        active={isFiltering}
        resetHandler={resetFilterHandler}
        filterHandler={filterHandler}
        exitHandler={() => {setIsFiltering(false)}}
      />
      <Alert
        active={alertActive}
        type={alert.type}
        message={alert.message}
      />
    </div>  
  )
}