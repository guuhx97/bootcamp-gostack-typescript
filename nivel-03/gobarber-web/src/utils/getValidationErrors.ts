import { ValidationError } from 'yup';
import IErrors from '../interfaces/IErrors';

export default function getValidationErrors(err: ValidationError): IErrors{
  const validationErrors: IErrors = {};

  err.inner.forEach((error: ValidationError) => {
      validationErrors[String(error.path)] = error.message;
  })
  return validationErrors;
}
