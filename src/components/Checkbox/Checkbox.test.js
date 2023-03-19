import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

const defaultProps = {
  label: 'Lorem ipsum et dolorem',
  checked: false,
  onToggleSelection: jest.fn(),
};

describe('Checkbox', () => {
  it('should render an unchecked state', () => {
    render(<Checkbox {...defaultProps} />);
    const label = screen.getByText(/lorem ipsum et dolorem/i);
    const checkboxIcon = document.querySelector('img');

    expect(label).toBeInTheDocument();
    expect(checkboxIcon.src).toContain('-unchecked');
  });

  it('should render a checked state', () => {
    render(<Checkbox {...defaultProps} checked={true} />);
    const label = screen.getByText(/lorem ipsum et dolorem/i);
    const checkboxIcon = document.querySelector('img');

    expect(label).toBeInTheDocument();
    expect(checkboxIcon.src).toContain('-checked');
  });

  it('should call the callback function passed as prop when clicked', () => {
    render(<Checkbox {...defaultProps} />);
    const label = screen.getByText(/lorem ipsum et dolorem/i);

    fireEvent.click(label);

    expect(defaultProps.onToggleSelection).toHaveBeenCalled();
  });
});
