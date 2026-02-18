import { ValidationError } from 'class-validator';

export function formatPipeErrors(errors: ValidationError[]) {
  const formattedErrors = {};

  errors.forEach(value => {
    if (value.property && value.constraints) {
      return (formattedErrors[value.property] = Object.values(
        value.constraints,
      ));
    }
  });

  return formattedErrors;
}
