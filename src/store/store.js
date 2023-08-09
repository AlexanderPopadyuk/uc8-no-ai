import { combineReducers, legacy_createStore as createStore } from 'redux';
import { reducer as formReducer } from './form/reducers';

const rootReducer = combineReducers({
  form: formReducer
});

export const store = createStore(rootReducer)