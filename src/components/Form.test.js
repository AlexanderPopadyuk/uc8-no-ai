import { fireEvent, render, screen } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
  it('renders all inputs', () => {
    render(<Form onSubmit={jest.fn()} />);
    const inputs = screen.getAllByTestId('form-input');
    expect(inputs).toHaveLength(4);
  });

  it('shows error messages', () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('"First name" is required')).toBeInTheDocument();
    expect(screen.getByText('"Last name" is required')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid e-mail')).toBeInTheDocument();
    expect(screen.getByText('"Message" should have at least 10 symbols')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with form values', () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

    const inputs = screen.getAllByTestId('form-input');
    fireEvent.change(inputs[0], { target: { value: 'first name' } });
    fireEvent.change(inputs[1], { target: { value: 'last name' } });
    fireEvent.change(inputs[2], { target: { value: 'test@mail.com' } });
    fireEvent.change(inputs[3], { target: { value: '1234567890' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledWith({
      first_name: 'first name',
      last_name: 'last name',
      email: 'test@mail.com',
      message: '1234567890'
    });
  });
});