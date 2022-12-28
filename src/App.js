import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import DashboardTransaction from './pages/DashboardTransaction';
import Login from './pages/Login';
import Logout from './pages/Logout';
import TicketDashboard from './pages/TIcketDashboard';
import Sidebar from './components/Sidebar';
import AddTicket from './pages/AddTicket';
import { Edit } from '@mui/icons-material';
import UpdateTicket from './pages/UpdateTicket';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard/tickets/update/:id' element={<Sidebar components={<UpdateTicket />} />} />
        <Route path='/dashboard/tickets/create' element={<Sidebar components={<AddTicket />} />} />
        <Route path='/dashboard/tickets' element={<Sidebar components={<TicketDashboard />} />} />
        <Route path='/dashboard/transactions' element={<DashboardTransaction />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
