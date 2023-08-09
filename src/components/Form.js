import { useState } from 'react';
import isEmail from 'validator/es/lib/isEmail';

const schema = [
  {
    name: 'first_name',
    label: 'First name',
    validation: value => !value ? '"First name" is required' : undefined
  },
  {
    name: 'last_name',
    label: 'Last name',
    validation: value => !value ? '"Last name" is required' : undefined
  },
  {
    name: 'email',
    label: 'E-mail',
    validation: value => !isEmail(value) ? 'Please enter a valid e-mail' : undefined
  },
  {
    name: 'message',
    label: 'Message',
    validation: value => value.length < 10 ? '"Message" should have at least 10 symbols' : undefined
  }
];

export const Form = ({ onSubmit: onSubmitProp }) => {
  const [state, setState] = useState({ values: {}, errors: {} });

  const onChange = (name, validation) => e => {
    const { value } = e.target;

    setState({
      values: {
        ...state.values,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validation(value)
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const errors = schema.reduce((acc, { name, validation }) => {
      acc[name] = validation(state.values[name] || '');
      return acc;
    }, {});
    if (Object.values(errors).some(value => !!value)) {
      setState({
        values: state.values,
        errors
      });
      return;
    }
    onSubmitProp(state.values);
  };

  return (
    <form className="main-form" noValidate onSubmit={onSubmit}>
      {schema.map(({ name, label, validation }) => {
        return (
          <div key={name} className="main-input">
            <label className="main-input__title" htmlFor={name}>{label}</label>
            <input
              className="main-input__input"
              type="text"
              name={name}
              value={state.values[name] || ''}
              onChange={onChange(name, validation)}
              data-testid="form-input"
            />
            {state.errors[name] && <p className="main-input__error">{state.errors[name]}</p>}
          </div>
        )
      })}
      <button className="main-button" type="submit">Save</button>
    </form>
  )
};