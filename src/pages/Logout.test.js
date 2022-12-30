import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Logout from "./Logout";

describe('Logout', () => {
  it('should go to login page', () => {
    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    expect(global.window.location.pathname).toBe('/login');
  });
})