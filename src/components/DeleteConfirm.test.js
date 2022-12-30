import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirm from './DeleteConfirm';

describe('DeleteConfirm', () => {
  it('should render correctly with standard init value', () => {
    render(<DeleteConfirm />);
    const confirmText = screen.getByTestId('dc-message').textContent;
    const buttons = screen.getAllByRole('button');

    expect(confirmText).toBe('');
    expect(buttons.length).toBe(2);
  });

  it('should get active class when active', () => {
    render(<DeleteConfirm active={true} />);
    const overlay = screen.getByTestId('overlay');

    expect(overlay.classList.contains('active')).toBe(true);
  });

  it('should fire cancelHandler when cancel button clicked', () => {
    const mockFn = jest.fn();
    render(<DeleteConfirm active={true} cancelHandler={mockFn} />);

    const cancelBtn = screen.getByTestId('dc-cancel');
    fireEvent.click(cancelBtn);

    expect(mockFn).toHaveBeenCalled();
  });

  it('should fire deleteHandler when cancel button clicked', () => {
    const mockFn = jest.fn();
    render(<DeleteConfirm active={true} deleteHandler={mockFn} />);

    const cancelBtn = screen.getByTestId('dc-delete');
    fireEvent.click(cancelBtn);

    expect(mockFn).toHaveBeenCalled();
  });
});