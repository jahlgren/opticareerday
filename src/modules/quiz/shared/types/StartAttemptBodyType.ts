import * as yup from 'yup';

type StartAttemptBodyType = {
  name: string,
  email: string
}

export const startAttemptBodySchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required()
});

export default StartAttemptBodyType;
