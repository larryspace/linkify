
export const required = value => value ? undefined : 'Required';

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

export const fileRequired = value => value.length === 0 && 'You need to choose a file...';

export const fileType = fileType => value =>
fileRequired(value) ||
!value[0].type.match(`${fileType}.*`) && `File needs to be of type ${fileType}`;

export const url = value =>
  value && !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(value) ?
  'Invalid Url' : undefined
