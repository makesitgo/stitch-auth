import React from 'react';
import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

interface Props {
  handleSubmit: (pwd: string) => Promise<void>;
}

interface ResetPassword {
  password: string;
  confirmPassword: string;
}

const initialFormValues: ResetPassword = { password: '', confirmPassword: '' };

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

class ResetPasswordForm extends React.Component<Props> {
  onSubmit = (values: ResetPassword, { resetForm, setSubmitting }: FormikActions<ResetPassword>) => {
    this.props
      .handleSubmit(values.password)
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
        render={(formProps: FormikProps<ResetPassword>) => (
          <Form className="login-form">
            <label htmlFor="reset-password" className="login-form-label">
              new password
            </label>
            <Field
              id="reset-password"
              className="login-form-input"
              type="password"
              name="password"
              placeholder="password"
            />
            <ErrorMessage name="password" />
            <label htmlFor="reset-confirm-password" className="login-form-label">
              confirm new password
            </label>
            <Field
              id="reset-confirm-password"
              className="login-form-input"
              type="password"
              name="confirmPassword"
              placeholder="password"
            />
            <ErrorMessage name="confirmPassword" />
            <button className="login-form-submit" type="submit" disabled={formProps.isSubmitting}>
              submit
            </button>
          </Form>
        )}
      />
    );
  }
}

export default ResetPasswordForm;
