import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('should render valid component', () => {
    render(
      <BrowserRouter>
        <Sidebar components={<div data-testid='inner-comp' >AMONGUS</div>} />
      </BrowserRouter>
    );

    const dashboardBtn = screen.getByTestId('sidebar-Dashboard');
    const ticketBtn = screen.getByTestId('sidebar-Manage Tickets');
    const logoutBtn = screen.getByTestId('sidebar-Logout');
    const inner = screen.getByTestId('inner-comp');

    expect(dashboardBtn).toBeInTheDocument();
    expect(ticketBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(inner).toBeInTheDocument();
  });

  it('should navigate to /dashboard if dashboardBtn clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar components={<div data-testid='inner-comp' >AMONGUS</div>} />
      </BrowserRouter>
    );

    const dashboardBtn = screen.getByTestId('sidebar-Dashboard');
    expect(dashboardBtn).toHaveAttribute('href', '/dashboard');
  });

  it('should navigate to /dashboard/tickets if ticketBtn clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar components={<div data-testid='inner-comp' >AMONGUS</div>} />
      </BrowserRouter>
    );

    const ticketBtn = screen.getByTestId('sidebar-Manage Tickets');
    expect(ticketBtn).toHaveAttribute('href', '/dashboard/tickets');
  });

  it('should navigate to /logout if logoutBtn clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar components={<div data-testid='inner-comp' >AMONGUS</div>} />
      </BrowserRouter>
    );

    const logoutBtn = screen.getByTestId('sidebar-Logout');
    expect(logoutBtn).toHaveAttribute('href', '/logout');
  });
});