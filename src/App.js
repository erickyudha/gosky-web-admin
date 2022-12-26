import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import DashboardTransaction from './pages/DashboardTransaction';
import Login from './pages/Login';
import TicketDashboard from './pages/TIcketDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard/tickets' element={<TicketDashboard />} />
        <Route path='/dashboard/transactions' element={<DashboardTransaction />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
