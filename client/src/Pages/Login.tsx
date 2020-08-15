import React from 'react';
import { Form, Formik, Field, FormikErrors, FormikValues, FormikProps } from 'formik';

import { Box } from 'Components/Common/UI';
import { TextField } from '@material-ui/core';

interface ILoginFormValues {
  email: string;
  password: string;
}

type materialFormiInput = (props: any) => void;

const MyInput: materialFormiInput = ({ field, form, ...props }) => {
  return <TextField {...field} {...props} variant="outlined" />;
};

const Login: React.FC<{}> = () => {
  const initialValues: ILoginFormValues = { email: '', password: '' };

  const validate = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    return errors;
  };

  return (
    <Box display="flex" height="100%" alignItems="center" justifyContent="center">
      <Box>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
          render={({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />
              <Field type="password" name="password" label="test" component={MyInput} />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        />
      </Box>
    </Box>
  );
};

export default Login;
