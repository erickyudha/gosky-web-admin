import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe('Alert', () => {
  it('should return valid alert element based on initial val', () => {
    render(<Alert active={true} type='success' message='test message' />);
    const alertElement = screen.getByTestId('alert');

    expect(alertElement.textContent).toBe('test message');
    expect(alertElement.classList.contains('success')).toBe(true);
    expect(alertElement.classList.contains('active')).toBe(true);
  });

  it('should remove active class on element if not active', () => {
    render(<Alert active={false} type='danger' message='test message' />);
    const alertElement = screen.getByTestId('alert');

    expect(alertElement.textContent).toBe('test message');
    expect(alertElement.classList.contains('danger')).toBe(true);
    expect(alertElement.classList.contains('active')).toBe(false);
  });
});