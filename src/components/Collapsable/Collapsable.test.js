import { fireEvent, render, screen } from '@testing-library/react';
import { Collapsable } from './Collapsable';

const defaultProps = {
  header: 'Some title',
  content: 'Some mocked content',
  expanded: false,
  onToggleExpand: jest.fn(),
};

describe('Collapsable', () => {
  it('should render the title but not content when collapsed', () => {
    render(<Collapsable {...defaultProps} />);
    const header = screen.getByText(/some title/i);
    const content = screen.queryByText(/some mocked content/i);

    expect(header).toBeInTheDocument();
    expect(content).not.toBeInTheDocument();
  });

  it('should render title and content when expanded', () => {
    render(<Collapsable {...defaultProps} expanded />);
    const header = screen.getByText(/some title/i);
    const content = screen.getByText(/some mocked content/i);

    expect(header).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('should call onToggleExpand when clicking in the header', () => {
    render(<Collapsable {...defaultProps} />);
    const header = screen.getByText(/some title/i);

    fireEvent.click(header);

    expect(defaultProps.onToggleExpand).toHaveBeenCalled();
  });
});
