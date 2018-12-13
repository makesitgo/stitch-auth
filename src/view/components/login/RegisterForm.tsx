import React from 'react';
import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { EmailPassword } from '../../../state';

interface Props {
  handleSubmit: (creds: EmailPassword) => Promise<void>;
}

interface RegisterEmailPassword extends EmailPassword {
  confirmPassword: string;
}

const initialFormValues: RegisterEmailPassword = { email: '', password: '', confirmPassword: '' };

const validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match')
    .required(),
});

class RegisterForm extends React.Component<Props> {
  onSubmit = (creds: EmailPassword, { resetForm, setSubmitting }: FormikActions<RegisterEmailPassword>) => {
    this.props
      .handleSubmit(creds)
      .then(() => {
        resetForm();
        setSubmitting(false);
      })
      .catch(() => setSubmitting(false));
  };

  render() {
    return (
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        render={(formProps: FormikProps<RegisterEmailPassword>) => (
          <Form className="login-form">
            <label htmlFor="register-email" className="login-form-label">
              email
            </label>
            <Field
              id="register-email"
              className="login-form-input"
              type="email"
              name="email"
              placeholder="liam@google.com"
            />
            <ErrorMessage name="email" />
            <label htmlFor="register-password" className="login-form-label">
              password
            </label>
            <Field
              id="register-password"
              className="login-form-input"
              type="password"
              name="password"
              placeholder="password"
            />
            <ErrorMessage name="password" />
            <label htmlFor="register-confirm-password" className="login-form-label">
              confirm password
            </label>
            <Field
              id="register-confirm-password"
              className="login-form-input"
              type="password"
              name="confirmPassword"
              placeholder="password"
            />
            <ErrorMessage name="confirmPassword" />
            <button className="login-form-submit" type="submit" disabled={formProps.isSubmitting}>
              register
            </button>
          </Form>
        )}
      />
    );
  }
}

export default RegisterForm;
