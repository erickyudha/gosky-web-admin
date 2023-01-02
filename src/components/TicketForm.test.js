import { fireEvent, render, screen } from "@testing-library/react";
import Mock from "../Mock";
import TicketForm from "./TicketForm";

describe('TicketForm', () => {
  const mockTicket = Mock.TICKET;
  
  it('should render component correctly without init ticket', async () => {
    render(
      <TicketForm onChange={jest.fn()} />
    );
    
    const ticketForm = screen.getByTestId('tf');
    

    expect(ticketForm.innerHTML).toContain('JAKARTA');
    expect(ticketForm.innerHTML).toContain('MEDAN');
    expect(ticketForm.innerHTML).toContain('Price');
    expect(ticketForm.innerHTML).toContain('Duration');
  });

  it('should render valid component with init ticket', () => {
    render(
      <TicketForm ticket={mockTicket} onChange={jest.fn()} />
    );

    const ticketForm = screen.getByTestId('tf');


    expect(ticketForm.innerHTML).toContain(mockTicket.description);
  });

  it('should handle value changing correctly', async () => {
    const changeHandler = jest.fn().mockReturnThis();
    render(
      <TicketForm onChange={changeHandler} />
    );
    const mockDate = "2023-01-01T09.00";
    const targetData = {
      category: 'ONE WAY',
      from: 'JAKARTA',
      to: 'MEDAN',
      price: 999999,
      duration: 99,
      departureTime: mockDate,
      description: 'lorem ipsum',
    };
    const targetImage = 'amongus';

    const priceInput = screen.getByTestId('tf-price');
    const durationInput = screen.getByTestId('tf-duration');
    const dtInput = screen.getByTestId('tf-dt');
    const descInput = screen.getByTestId('tf-desc');
    const imageInput = screen.getByTestId('tf-image');

    fireEvent.change(priceInput, {
      target: { value: targetData.price }
    });
    fireEvent.change(durationInput, {
      target: { value: targetData.duration }
    });
    fireEvent.change(dtInput, {
      target: { value: targetData.departureTime }
    });
    fireEvent.change(descInput, {
      target: { value: targetData.description }
    });
    fireEvent.change(imageInput, {
      target: { files: [targetImage] }
    });
    

    expect(changeHandler).toHaveBeenCalledTimes(5);
  });
});