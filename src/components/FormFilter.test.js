import { fireEvent, render, screen } from '@testing-library/react';
import FormFilter from './FormFilter';

describe('FormFilter', () => {
  it('should render and handle value change correctly', () => {
    const resetHandler = jest.fn();
    const filterHandler = jest.fn();
    render(
      <FormFilter
        active={true}
        resetHandler={resetHandler}
        filterHandler={filterHandler}
        exitHandler={jest.fn()}
      />
    );

    const resetBtn = screen.getByTestId('ff-reset-btn');
    const filterBtn = screen.getByTestId('ff-filter-btn');
    const dtInput = screen.getByTestId('ff-dt');

    fireEvent.change(dtInput, {
      target: { value: '2023-01-01T09.00' },
    });

    fireEvent.click(filterBtn);
    expect(filterHandler).toHaveBeenCalled();
    
    fireEvent.click(resetBtn);
    expect(resetHandler).toHaveBeenCalled();
  });
});