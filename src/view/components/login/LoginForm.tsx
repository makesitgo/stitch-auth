import React from 'react';
import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { EmailPassword } from '../../../state';

interface Props {
  handleSubmit: (creds: EmailPassword) => Promise<void>;
}

const initialFormValues: EmailPassword = { email: '', password: '' };

const validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});

class LoginForm extends React.Component<Props> {
  onSubmit = (creds: EmailPassword, { resetForm, setSubmitting }: FormikActions<EmailPassword>) => {
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
        render={(formProps: FormikProps<EmailPassword>) => (
          <Form className="login-form">
            <label htmlFor="login-email" className="login-form-label">
              email
            </label>
            <Field
              id="login-email"
              className="login-form-input"
              type="email"
              name="email"
              placeholder="liam@google.com"
            />
            <ErrorMessage name="email" />
            <label htmlFor="login-password" className="login-form-label">
              password
            </label>
            <Field
              id="login-password"
              className="login-form-input"
              type="password"
              name="password"
              placeholder="password"
            />
            <ErrorMessage name="password" />
            <button className="login-form-submit" type="submit" disabled={formProps.isSubmitting}>
              login
            </button>
          </Form>
        )}
      />
    );
  }
}

export default LoginForm;
