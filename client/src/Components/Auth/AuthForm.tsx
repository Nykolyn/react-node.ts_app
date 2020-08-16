import React from 'react';
import { Form, Formik, Field, FormikErrors, FormikValues } from 'formik';
import * as Yup from 'yup';

import { Button, TextBlock, Link, Box } from 'Components/Common/UI';
import InputField from 'Components/Common/InputField';
import { ILoginFormValues } from 'Interfaces';
import { colors } from 'styles/styledTheme';

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

type AuthFormProps = {
  action: string;
  onSubmit: (values: FormikValues) => Promise<null>;
};

const AuthForm: React.FC<AuthFormProps> = ({ action, onSubmit }) => {
  const initialValues: ILoginFormValues = { email: '', password: '' };

  const validate = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    return errors;
  };

  return (
    <Box bgcolor={colors.transparentBg} p={4} borderRadius="sm" width={['90%', '500px']}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        validationSchema={FormSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            alert(JSON.stringify(values, null, 2));
            await onSubmit(values);
            setSubmitting(false);
          }, 400);
        }}
        render={({ isSubmitting, errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column">
              <Box mb={3}>
                <Field
                  type="text"
                  name="email"
                  width="100%"
                  label="E-mail"
                  helperText={errors.email && touched.email && errors.email}
                  error={errors.email && touched.email}
                  component={InputField}
                />
              </Box>
              <Box mb={3}>
                <Field
                  type="password"
                  width="100%"
                  name="password"
                  label="Password"
                  helperText={errors.password && touched.password && errors.password}
                  error={errors.password && touched.password}
                  component={InputField}
                />
              </Box>
              <TextBlock mb={2}>{action === 'login' ? "Don't have an account?" : 'Already have an accont?'}</TextBlock>
              <Link mb={3} to={action === 'register' ? '/login' : '/register'} fontSize="lg" color="link">
                {action === 'register' ? 'Log in' : 'Register'}
              </Link>
              <Button type="submit" variant="contained" className="animated-gradient-bg" disabled={isSubmitting}>
                Submit
              </Button>
            </Box>
          </Form>
        )}
      />
    </Box>
  );
};

export default AuthForm;
