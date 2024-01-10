import * as yup from 'yup';

type AttemptAnswerBodyType = {
  questionId: string,
  answerId: string
};

export const attemptAnswerBodySchema: yup.SchemaOf<AttemptAnswerBodyType> = yup.object({
  questionId: yup.string().uuid().required(),
  answerId: yup.string().uuid().required()
});

export default AttemptAnswerBodyType;
