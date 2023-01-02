import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Mock from '../Mock';
import AllListTransaction from './AllListTransaction';

describe('AllListTransaction', () => {
  it('should render valid component', async () => {
    render(
      <BrowserRouter>
        <AllListTransaction />
      </BrowserRouter>
    )

    const transactions = [{
      ...Mock.TRANSACTION,
      ticket: Mock.TICKET,
      user: Mock.USER,
    }];
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        status: 'success',
        data: transactions,
      })
    });

    const cell = screen.getByTestId('test-cell-0');
    expect(cell).toBeInTheDocument();
  });
});