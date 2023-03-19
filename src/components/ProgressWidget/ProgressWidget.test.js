import { fireEvent, render, screen } from '@testing-library/react';
import { ProgressWidget } from './ProgressWidget';

const mockedGroups = [
  {
    name: 'General Info',
    tasks: [
      {
        description: 'Add name and surname',
        value: 10,
        checked: true,
      },
      {
        description: 'Add email',
        value: 20,
        checked: false,
      },
      {
        description: 'Add linkedin profile',
        value: 10,
        checked: false,
      },
    ],
  },
  {
    name: 'Acomplishments',
    tasks: [
      {
        description: 'Wrote a small poem about the birthday',
        value: 20,
        checked: false,
      },
      {
        description: 'Jump three times with one leg',
        value: 20,
        checked: true,
      },
    ],
  },
  {
    name: 'Personal retrospective',
    tasks: [
      {
        description: 'Remember a dream',
        value: 20,
        checked: true,
      },
    ],
  },
];

const defaultProps = {
  title: 'Lodgify Grouped Tasks',
  taskGroups: mockedGroups,
};

describe('ProgressWidget', () => {
  it('should render all the groups titles', () => {
    render(<ProgressWidget {...defaultProps} />);
    const group1 = screen.getByText(/general info/i);
    const group2 = screen.getByText(/acomplishments/i);
    const group3 = screen.getByText(/personal retrospective/i);

    expect(group1).toBeInTheDocument();
    expect(group2).toBeInTheDocument();
    expect(group3).toBeInTheDocument();
  });

  it('should show the correct progress', () => {
    render(<ProgressWidget {...defaultProps} />);
    const progress = screen.getByText(/50%/i);
    expect(progress).toBeInTheDocument();
  });

  it('should render all tasks from a group when clicking on it', () => {
    render(<ProgressWidget {...defaultProps} />);
    const group1 = screen.getByText(/general info/i);

    fireEvent.click(group1);

    const task1 = screen.getByText(/add name and surname/i);
    const task2 = screen.getByText(/add email/i);
    const task3 = screen.getByText(/add linkedin profile/i);

    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();
    expect(task3).toBeInTheDocument();
  });

  it('should change the progress correctly when clicking on a task', () => {
    render(<ProgressWidget {...defaultProps} />);
    const group1 = screen.getByText(/general info/i);

    fireEvent.click(group1);
    const task = screen.getByText(/add email/i);
    fireEvent.click(task);

    const progress = screen.getByText(/70%/i);

    expect(progress).toBeInTheDocument();
  });

  it('should not render the tasks of a group after closing it', async () => {
    render(<ProgressWidget {...defaultProps} />);
    const group1 = screen.getByText(/general info/i);

    await fireEvent.click(group1);
    await fireEvent.click(group1);

    const task1 = screen.queryByText(/add name and surname/i);
    const task2 = screen.queryByText(/add email/i);
    const task3 = screen.queryByText(/add linkedin profile/i);

    expect(task1).not.toBeInTheDocument();
    expect(task2).not.toBeInTheDocument();
    expect(task3).not.toBeInTheDocument();
  });
});
