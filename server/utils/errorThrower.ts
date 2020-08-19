import { HttpsErrorException } from '../exceptions';

const errorThrower = ({ message = 'Invalid Data', status = 500, data = {} }) => {
  const error = new HttpsErrorException({ status, message, data });

  throw error;
};

export default errorThrower;
