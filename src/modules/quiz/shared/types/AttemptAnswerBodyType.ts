import * as yup from 'yup';

type AttemptAnswerBodyType = {
  questionId: string,
  answerId: string
};

export const attemptAnswerBodySchema: yup.SchemaOf<AttemptAnswerBodyType> = yup.object({
  questionId: yup.string().required(),
  answerId: yup.string().required()
});

export default AttemptAnswerBodyType;
