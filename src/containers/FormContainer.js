import { Form } from '../components/Form';
import { useDispatch } from 'react-redux';
import { actions as formActions } from '../store/form/actions';

export const FormContainer = () => {
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch({ type: formActions.update, payload: values });
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} />
    </div>
  );
};