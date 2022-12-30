import { render, screen } from "@testing-library/react";
import LoadingScreen from "./LoadingScreen";

describe('LoadingScreen', () => {
  it('should render valid active component', () => {
    render(<LoadingScreen active={true} />);

    expect(screen.getByTestId('overlay').classList.contains('active')).toBe(true);
  });

  it('should render valid inactive component', () => {
    render(<LoadingScreen active={false} />);

    expect(screen.getByTestId('overlay').classList.contains('active')).toBe(false);
  });
});