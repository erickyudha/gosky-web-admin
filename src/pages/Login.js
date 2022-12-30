import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    try { 
      setIsLoading(true)
      setInvalidLogin(false);
      if (email.length < 3 || password.length < 4) {
        throw new Error('Invalid Input Length!')
      }
      const url = 'https://gosky.up.railway.app/api/auth/login'
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
      const response = await rawResponse.json();
      if (response.status === 'failed' || response.status === 'error') {
        throw new Error(response.message);
      }
      const accessToken = response.data.accessToken;

      const url2 = 'https://gosky.up.railway.app/api/auth/whoami';
      const rawResponse2 = await fetch(url2, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        },
      })
      const response2 = await rawResponse2.json();
      if (response2.data.role !== 'ADMIN') {
        throw new Error('Not an Admin!')
      }

      setCookie('accessToken', accessToken, { path: '/' });
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      setInvalidLogin(true);
      setErrorMsg(error.message);
    }
  }

  useEffect(() => {
    document.title = 'Login - GoSky Admin'
    const validateAccessToken = async () => {
      try {
        const url = 'https://gosky.up.railway.app/api/auth/whoami';
        const rawResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + cookies.accessToken,
          },
        })
        const response = await rawResponse.json(); 
        if (response.status === 'success') {
          navigate('/dashboard');
        } else {
          throw new Error()
        }
      } catch (error) {
        setCookie('accessToken', '', { path: '/' });
      }
    }

    if (cookies.accessToken !== '') {
      validateAccessToken();
    }
  }, [])

  return (
    <main>
      <LoadingScreen active={isLoading} />
      <div className="main-form">
        <img alt="gosky admin" src="/gosky_admin.svg"></img>
        <div className='inputs'>
          <input className={(invalidLogin) ? 'invalid' : ''} name="email" placeholder='Email' onChange={(e) => {
            setEmail(e.target.value);
          }}></input>
          <input className={(invalidLogin) ? 'invalid' : ''} name="password" placeholder='Password' type='password' onChange={(e) => {
            setPassword(e.target.value);
          }}></input>
          {(invalidLogin) ? 
            <span className='error-msg'>{errorMsg}</span> : ''
          }
        </div>
        <button onClick={handleClick}>Login</button>
      </div>
    </main>
  )
}