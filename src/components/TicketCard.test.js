import TicketCard from "./TicketCard";
import Mock from "../Mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe('TicketCard', () => {
  it('should render valid ticket card', async () => {
    const mockTicket = Mock.TICKET;
    const mockFn = jest.fn();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        status: 'success'
      })
    });

    render(
      <BrowserRouter>
        <TicketCard ticket={mockTicket} deleteHandler={mockFn} />
      </BrowserRouter>
    );
    
    expect(await screen.findByText(mockTicket.flightNumber)).toBeInTheDocument();
    expect(await screen.findByText(`${mockTicket.from}-${mockTicket.to}`)).toBeInTheDocument();
  });

  it('should fire deleteHandler when delete confirm btn clicked', async () => {
    const mockTicket = Mock.TICKET;
    const mockFn = jest.fn();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        status: 'success'
      })
    });
    
    render(
      <BrowserRouter>
        <TicketCard ticket={mockTicket} deleteHandler={mockFn} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('tc-del-btn'));
    fireEvent.click(screen.getByTestId('dc-delete'));

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalled();
    })
  });

  it('should navigate to edit ticket page when edit btn clicked', async () => {
    const mockTicket = Mock.TICKET;
    const mockFn = jest.fn();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        status: 'success'
      })
    });

    render(
      <BrowserRouter>
        <TicketCard ticket={mockTicket} deleteHandler={mockFn} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('tc-edit-btn'));
    expect(global.window.location.pathname).toBe(
      '/dashboard/tickets/update/' + mockTicket.id);
  });

  it('should fire deleteHandler with appropriate alert when error', async () => {
    const mockTicket = {
      ...Mock.TICKET,
      category: 'ONE_WAY'
    };
    const mockFn = jest.fn();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        status: 'error',
        message: 'test',
      })
    });

    render(
      <BrowserRouter>
        <TicketCard ticket={mockTicket} deleteHandler={mockFn} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('tc-del-btn'));
    fireEvent.click(screen.getByTestId('dc-cancel'));
    fireEvent.click(screen.getByTestId('tc-del-btn'));
    fireEvent.click(screen.getByTestId('dc-delete'));
    await waitFor(() => {
      expect(mockFn).toHaveBeenCalled();
    })
  });
});