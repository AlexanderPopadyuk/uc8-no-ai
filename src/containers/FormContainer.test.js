import { render, screen } from '@testing-library/react';
import { FormContainer } from './FormContainer';
import { Provider } from 'react-redux';
import { store } from '../store/store';

var mockForm = jest.fn()
jest.mock('../components/Form', () => ({
  Form: jest.fn(props => {
    mockForm(props);
    return <div data-testid="form-component" />;
  })
}));

describe('FormContainer', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('Form is rendered', () => {
    render(
      <Provider store={store}>
        <FormContainer />
      </Provider>
    );
    const formComponent = screen.getByTestId('form-component');
    expect(formComponent).toBeInTheDocument();
  });

  it('shows store values', () => {
    mockForm.mockImplementationOnce(props => {
      props.onSubmit({
        first_name: 'first_name value',
        last_name: 'last_name value',
        email: 'email value',
        message: 'message value'
      });
    });
    render(
      <Provider store={store}>
        <FormContainer />
      </Provider>
    );
    expect(screen.getByText('first_name: first_name value')).toBeInTheDocument();
    expect(screen.getByText('last_name: last_name value')).toBeInTheDocument();
    expect(screen.getByText('email: email value')).toBeInTheDocument();
    expect(screen.getByText('message: message value')).toBeInTheDocument();
  });
});