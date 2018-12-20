import React from 'react';
import { StitchUser } from 'mongodb-stitch-browser-sdk';
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
  handleSubmit: (creds: EmailPassword) => Promise<StitchUser>;
  gotoConfirmationEmail: () => void;
}

const initialFormData: EmailPassword = { email: '', password: '' };

const handleValidation = (name: string, value: string) => {
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
  }
  return Promise.resolve();
};

class LoginForm extends React.Component<Props> {
  render() {
    const { handleSubmit, gotoConfirmationEmail } = this.props;
    return (
      <Form
        initialFormData={initialFormData}
        onValidation={handleValidation}
        onSubmit={({ data, setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(data).catch(err => {
            const { message: errMsg } = err;

            if (errMsg.includes('confirmation required')) {
              gotoConfirmationEmail();
              return;
            }

            if (errMsg.includes('invalid username/password')) {
              resetForm({ password: '' });
            } else {
              resetForm();
            }
            setSubmitting();
          });
        }}
      >
        {({ data, errors, submitting, handleInputChange, handleInputBlur }) => (
          <>
            <FormGroup>
              <FormLabel>
                <FormLabelTitle>
                  <label htmlFor="login-email">email</label>
                </FormLabelTitle>
              </FormLabel>
              <FormInput>
                <FormInputControl error={errors.email}>
                  <input
                    id="login-email"
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
                  <label htmlFor="login-password">password</label>
                </FormLabelTitle>
              </FormLabel>
              <FormInput>
                <FormInputControl error={errors.password}>
                  <input
                    id="login-password"
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
            <FormSubmit>
              <button
                type="submit"
                disabled={
                  submitting ||
                  (data.email === '' && data.password === '') ||
                  (errors.email !== '' || errors.password !== '')
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

export default LoginForm;
