import * as yup from 'yup';

export const SignInSchemaValidator = yup.object({
  username: yup.string().required('Användarnamn är obligatoriskt'),
  password: yup.string().required('Lösenord är obligatoriskt')
});

type SignInSchema = yup.InferType<typeof SignInSchemaValidator>;

export default SignInSchema;
