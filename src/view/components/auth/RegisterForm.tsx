import React from 'react';
import {
  Form,
  FormGroup,
  FormLabel,
  FormLabelTitle,
  FormInput,
  FormInputControl,
  FormInputError,
  FormSubmit,
} from '../';
import * as yup from 'yup';
import { EmailPassword } from '../../../state';

interface Props {
  handleSubmit: (creds: EmailPassword) => Promise<void>;
  gotoWaitingRoom: () => void;
  gotoLogin: () => void;
}

interface RegisterEmailPassword extends EmailPassword {
  confirmPassword: string;
}

const initialFormData: RegisterEmailPassword = { email: '', password: '', confirmPassword: '' };

const handleValidation = (name: string, value: string, values: RegisterEmailPassword) => {
  switch (name) {
    case 'email':
      return yup
        .string()
        .email('must specify a valid email')
        .required('must specify an email')
        .validate(value);
    case 'password':
      return yup
        .string()
        .min(8, 'must specify a password with at least 8 characters')
        .validate(value);
    case 'confirmPassword':
      if (value !== values.password) {
        return Promise.reject('must specify the same password');
      }
      return yup
        .string()
        .min(8, 'must specify a password with at least 8 characters')
        .validate(value);
  }
  return Promise.resolve();
};

class RegisterForm extends React.Component<Props> {
  render() {
    const { handleSubmit, gotoWaitingRoom, gotoLogin } = this.props;
    return (
      <Form
        initialFormData={initialFormData}
        onValidation={handleValidation}
        onSubmit={({ data, setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(data)
            .then(gotoWaitingRoom)
            .catch(err => {
              const { message: errMsg } = err;

              if (errMsg.includes('name already in use')) {
                gotoLogin();
                return;
              }

              resetForm();
              setSubmitting();
            });
        }}
      >
        {({ data, errors, submitting, handleInputChange, handleInputBlur }) => (
          <>
            <FormGroup>
              <FormLabel>
                <FormLabelTitle>
                  <label htmlFor="register-email">email</label>
                </FormLabelTitle>
              </FormLabel>
              <FormInput>
                <FormInputControl error={errors.email}>
                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    placeholder="liam@gmail.com"
                    value={data.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                </FormInputControl>
                <FormInputError error={errors.email} />
              </FormInput>
            </FormGroup>
            <FormGroup>
              <FormLabel>
                <FormLabelTitle>
                  <label htmlFor="register-password">password</label>
                </FormLabelTitle>
              </FormLabel>
              <FormInput>
                <FormInputControl error={errors.password}>
                  <input
                    id="register-password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={data.password}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                </FormInputControl>
                <FormInputError error={errors.password} />
              </FormInput>
            </FormGroup>
            <FormGroup>
              <FormLabel>
                <FormLabelTitle>
                  <label htmlFor="register-confirm-password">confirm password</label>
                </FormLabelTitle>
              </FormLabel>
              <FormInput>
                <FormInputControl error={errors.confirmPassword}>
                  <input
                    id="register-confirm-password"
                    type="password"
                    name="confirmPassword"
                    placeholder="password"
                    value={data.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                </FormInputControl>
                <FormInputError error={errors.confirmPassword} />
              </FormInput>
            </FormGroup>
            <FormSubmit>
              <button
                type="submit"
                disabled={
                  submitting ||
                  (data.email === '' && data.password === '' && data.confirmPassword === '') ||
                  (errors.email !== '' || errors.password !== '' || errors.confirmPassword !== '')
                }
              >
                submit
              </button>
            </FormSubmit>
          </>
        )}
      </Form>
    );
  }
}

export default RegisterForm;
