import { render, screen } from "@testing-library/react";
import Overlay from "./Overlay.";

describe('Overlay', () => {
  it('should render active when initialized default', () => {
    render(<Overlay />)
    const overlay = screen.getByTestId('overlay');

    expect(overlay.classList.contains('active')).toBe(true);
  });

  it('should remove active class when not active', () => {
    render(<Overlay active={false} />)
    const overlay = screen.getByTestId('overlay');

    expect(overlay.classList.contains('active')).toBe(false);
  });
});