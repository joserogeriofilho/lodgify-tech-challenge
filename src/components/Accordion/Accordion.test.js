import { fireEvent, render, screen } from '@testing-library/react';
import { Accordion } from './Accordion';

const defaultProps = {
  header: 'Some title',
  content: 'Some mocked content',
  expanded: false,
  onToggleExpand: jest.fn(),
};

describe('Accordion', () => {
  it('should render the title but not content when collapsed', () => {
    render(<Accordion {...defaultProps} />);
    const header = screen.getByText(/some title/i);
    const content = screen.queryByText(/some mocked content/i);

    expect(header).toBeInTheDocument();
    expect(content).not.toBeInTheDocument();
  });

  it('should render title and content when expanded', () => {
    render(<Accordion {...defaultProps} expanded />);
    const header = screen.getByText(/some title/i);
    const content = screen.getByText(/some mocked content/i);

    expect(header).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('should call onToggleExpand when clicking in the header', () => {
    render(<Accordion {...defaultProps} />);
    const header = screen.getByText(/some title/i);

    fireEvent.click(header);

    expect(defaultProps.onToggleExpand).toHaveBeenCalled();
  });
});
