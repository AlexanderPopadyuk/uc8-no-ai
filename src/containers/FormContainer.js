import { Form } from '../components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { actions as formActions } from '../store/form/actions';

export const FormContainer = () => {
  const dispatch = useDispatch();
  const formState = useSelector(store => store.form);
  const formIsCompleted = Object.values(formState).some(value => !!value);

  const onSubmit = values => {
    dispatch({ type: formActions.update, payload: values });
  };

  const onClear = () => {
    dispatch({ type: formActions.clear });
  };

  return (
    <div className="form-container">
      {!formIsCompleted && <Form onSubmit={onSubmit} />}
      {formIsCompleted && (
        <div className="form-results">
          {Object.entries(formState).map(([field, value]) => (
            <div key={field}>{field}: {value}</div>
          ))}
          <button className="main-button" onClick={onClear}>Clear state</button>
        </div>
      )}
    </div>
  );
};