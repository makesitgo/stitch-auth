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

interface Props {
  handleSubmit: (pwd: string) => Promise<void>;
  gotoHome: () => void;
}

interface ResetPassword {
  password: string;
  confirmPassword: string;
}

const initialFormData: ResetPassword = { password: '', confirmPassword: '' };

const handleValidation = (name: string, value: string, values: ResetPassword) => {
  switch (name) {
    case 'password':
      return yup
        .string()
        .min(8, 'must specify a password with at least 8 characters')
        .validate(value);
    case 'confirmPassword':
      if (value !== values.confirmPassword) {
        return Promise.reject('must specify the same password');
      }
      return yup
        .string()
        .min(8, 'must specify a password with at least 8 characters')
        .validate(value);
  }
  return Promise.resolve();
};

class ResetPasswordForm extends React.Component<Props> {
  render() {
    const { handleSubmit, gotoHome } = this.props;
    return (
      <Form
        initialFormData={initialFormData}
        onValidation={handleValidation}
        onSubmit={({ data, setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(data.password)
            .then(gotoHome)
            .catch(() => {
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
                  <label htmlFor="reset-password-password">password</label>
                </FormLabelTitle>
              </FormLabel>
              <FormInput>
                <FormInputControl error={errors.password}>
                  <input
                    id="reset-password-password"
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
                  <label htmlFor="reset-password-confirm-password">confirm password</label>
                </FormLabelTitle>
              </FormLabel>
              <FormInput>
                <FormInputControl error={errors.confirmPassword}>
                  <input
                    id="reset-password-confirm-password"
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
                  (data.password === '' && data.confirmPassword === '') ||
                  (errors.password !== '' || errors.confirmPassword !== '')
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

export default ResetPasswordForm;
