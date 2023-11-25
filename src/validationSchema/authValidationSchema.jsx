import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
});
const signupValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()._-])[A-Za-z\d@$!%*#?&^()._-]{8,24}$/,
      'Password must contain at least one number and one special character'
    )
    .min(8, 'Password must be at least 8 characters long'),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().required(),
  gender: yup.string().nullable().optional()
});

export const validationSchema = { loginValidationSchema, signupValidationSchema };
