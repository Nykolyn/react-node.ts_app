import React from 'react';
import { Input } from './UI';

const InputField: React.FC<{ field: object; form: object }> = ({ field, form, ...props }) => {
  return <Input {...field} variant="outlined" {...props} />;
};

export default InputField;
