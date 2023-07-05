interface ErrorMessage {
  [key: string]: string;
}

const errorMessages: ErrorMessage = {
  required: 'This field is required',
  pattern: 'Email is not valid',
  minlength: 'This field must be longer than 5 characters',
};

export function validatorErrorMessage(validatorName: string): string {
  return errorMessages[validatorName] ?? '';
}
