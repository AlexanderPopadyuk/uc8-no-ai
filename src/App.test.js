import { render, screen } from '@testing-library/react';
import { App } from './App';

jest.mock('./containers/FormContainer', () => ({
  FormContainer: () => <div data-testid="form-container" />
}));

test('renders FormContainer', () => {
  render(<App />);
  const linkElement = screen.getByTestId('form-container');
  expect(linkElement).toBeInTheDocument();
});
