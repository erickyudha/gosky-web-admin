import { findByText, render, screen } from "@testing-library/react";
import Mock from "../Mock";
import TicketPreview from "./TicketPreview";

describe('TicketPreview', () => {
  it('should render valid component based on init val', async () => {
    const mockTicket = Mock.TICKET;
    const mockUser = {
      name: 'Bob',
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        status: 'success',
        data: mockUser,
      }),
    });

    render(<TicketPreview ticket={mockTicket} />)

    expect(await screen.findByText(mockTicket.flightNumber)).toBeInTheDocument();
    expect((await screen.findAllByText(mockUser.name)).length).toBe(2);
  });

  it('should still render valid component if user not found', async () => {
    const mockTicket = {
      ...Mock.TICKET,
      createdBy: null,
    };
    const mockUser = {
      name: 'Bob',
    };
    let runOnce = false;
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      if (runOnce) {
        return new Promise((resolve, _) => {
          resolve({
            json: jest.fn().mockResolvedValue({
              status: 'success',
              data: mockUser,
            }),
          });
        });
      } else {
        runOnce = true;
        return new Promise((resolve, _) => {
          resolve({
            json: jest.fn().mockResolvedValue({
              status: 'failed',
            }),
          });
        });
      }
    });

    render(<TicketPreview ticket={mockTicket} />)

    expect(await screen.findByText(mockTicket.flightNumber)).toBeInTheDocument();
    expect(await screen.findByText('-')).toBeInTheDocument();
    expect(await screen.findByText(mockUser.name)).toBeInTheDocument();
  });
});