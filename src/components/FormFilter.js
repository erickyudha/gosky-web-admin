import { useState } from 'react';
import './FormFilter.css';
import Overlay from './Overlay.';

export default function FormFilter(props) {
  const {
    active,
    resetHandler,
    filterHandler,
    exitHandler,
  } = props;
  const [filter, setFilter] = useState({});
  const cities = [
    '-',
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
    <Overlay active={active}>
      <div className='form-filter'>
        <img src='/x.svg' alt='X' onClick={exitHandler} />
        <div className='input-filter'>
          <div className='pair'>
            <label>Category</label>
            <select
              onChange={(e) => {
                setFilter(old => {
                  const val = e.target.value;
                  if (val === '-') {
                    delete old.category;
                    return old;
                  };
                  return {
                    ...old,
                    category: val
                  }
                })
              }}
            >
              <option defaultChecked>-</option>
              <option value='ONE_WAY'>ONE WAY</option>
              <option value='ROUND_TRIP'>ROUND TRIP</option>
            </select>
          </div>
          <div className="row">
            <div className="pair">
              <label>From</label>
              <select
                onChange={(e) => {
                  setFilter(old => {
                    const val = e.target.value;
                    if (val === '-') {
                      delete old.from;
                      return old;
                    };
                    return {
                      ...old,
                      from: val,
                    }
                  })
                }}
              >
                {cities.map((city) => <option key={'from_' + city}>{city}</option>)}
              </select>
            </div>
            <div className="pair">
              <label>To</label>
              <select
                onChange={(e) => {
                  setFilter(old => {
                    const val = e.target.value;
                    if (val === '-') {
                      delete old.to;
                      return old;
                    };
                    return {
                      ...old,
                      to: val,
                    }
                  })
                }}
              >
                {cities.map((city) => <option key={'to_' + city}>{city}</option>)}
              </select>
            </div>
          </div>
          <div className="pair">
            <label>Departure Time</label>
            <input
              data-testid='ff-dt'
              placeholder="Departure Time"
              type='datetime-local'
              onChange={(e) => {
                setFilter(old => {
                  const val = e.target.value;
                  return {
                    ...old,
                    departureTime: val,
                  }
                })
              }}
            ></input>
          </div>
          {(filter.category === 'ROUND_TRIP') ?
            <div className="pair">
              <label>Return Time</label>
              <input
                placeholder="Return Time"
                type='datetime-local'
                onChange={(e) => {
                  setFilter(old => {
                    const val = e.target.value;
                    return {
                      ...old,
                      returnTime: val,
                    }
                  })
                }}
              ></input>
            </div> : ''
          }
        </div>
        

        <div className='control'>
          <button
            data-testid='ff-reset-btn'
            onClick={() => {
              setFilter({});
              resetHandler();
            }}
          >Reset</button>
          <button
            data-testid='ff-filter-btn'
            onClick={() => {
              filterHandler(filter);
            }}
          >Filter</button>
        </div>
      </div>
    </Overlay>
  )
}