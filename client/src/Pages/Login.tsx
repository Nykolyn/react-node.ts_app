import React from 'react';
import { FormikValues } from 'formik';

import { Box } from 'Components/Common/UI';
import AuthForm from 'Components/Auth/AuthForm';

const Login: React.FC = () => {
  const onSubmit = async (values: FormikValues) => null;

  return (
    <Box display="flex" height="100%" alignItems="center" justifyContent="center">
      <AuthForm action="login" onSubmit={onSubmit} />
    </Box>
  );
};

export default Login;
