import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);

  useEffect(() => {
    setCookie('accessToken', '', { path: '/' });
    navigate('/login');
  }, [])
}