import { actions } from './actions';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  message: ''
};

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case actions.update:
      return {
        ...state,
        ...action.payload
      };
    case actions.clear:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
