import * as yup from 'yup';
const numberValidation = yup
  .number('The value has to be a number')
  .positive('The value has to be a positive number')
  .required('Pls add a value');

export let heroSchema = yup.object().shape({
  real_name: yup
    .string()
    .trim()
    .max(80, 'This hero name is too long')
    .required('Add a hero real name'),
  nickname: yup
    .string()
    .trim()
    .max(80, 'This hero name is too long')
    .lowercase()
    .required('Add a hero real nickname'),
  alignment: yup.string().required('Chose hero`s alignment'),
  species: yup.string().required('Chose hero`s species'),
  sex: yup.string().required('Chose hero`s sex'),
  age: numberValidation,
  height: numberValidation,
  weight: numberValidation,
});
