import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

describe('Login', () => {
  it('should render valid page', () => {
    render(
      <CookiesProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </CookiesProvider>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should go to dashboard if login success', async () => {
    render(
      <CookiesProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </CookiesProvider>
    );
    
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        status: 'success',
        data: {
          role: 'ADMIN',
          accessToken: 'ladiw',
        }
      }),
    });
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passInput = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByTestId('login-btn');
    
    fireEvent.change(emailInput, {
      target: { value: 'gosky.admin@gmail.com' }
    });
    fireEvent.change(passInput, {
      target: { value: 'password' }
    });
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(global.window.location.pathname).toBe('/dashboard');
    })
  });

  it('should be able to handle login error', async () => {
    render(
      <CookiesProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </CookiesProvider>
    );


    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        status: 'failed',
        message: 'test error',
      }),
    });

    const emailInput = screen.getByPlaceholderText('Email');
    const passInput = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByTestId('login-btn');

    fireEvent.change(emailInput, {
      target: { value: 'gosky.admin@gmail.com' }
    });
    fireEvent.change(passInput, {
      target: { value: 'password' }
    });
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByTestId('login-err-msg').textContent).toBe('test error');
    })
  });
});