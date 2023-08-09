import { Provider } from 'react-redux';
import { store } from './store/store';
import { FormContainer } from './containers/FormContainer';

export const App = () => {
  return (
    <Provider store={store}>
      <div className="main-container">
        <FormContainer />
      </div>
    </Provider>
  );
};
