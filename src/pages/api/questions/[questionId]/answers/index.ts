import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultEntityManager, withMikroOrm } from '../../../../../core/mikro-orm/server';
import Answer from '../../../../../core/mikro-orm/shared/entities/Answer';
import Question from '../../../../../core/mikro-orm/shared/entities/Question';
import isUuid from '../../../../../core/mikro-orm/shared/utils/is-uuid';
import handleRequest, { CallbackWithBody } from '../../../../../core/utils/server/handle-request';
import UpsertAnswerBodyType, { upsertAnswerBodySchema } from '../../../../../modules/quiz/shared/types/UpsertAnswerBodyType';

const post: CallbackWithBody<UpsertAnswerBodyType> = async ({ request, response, em, body }) => {
  const questionId = request.query.questionId as string;
  if(!isUuid(questionId)) {
    return response.status(200).json({error: 'Invalid question id'});
  }
  const question = em.getReference(Question, questionId);
  const answer = em.create(Answer, {
    content: { sv: body.sv, fi: body.fi },
    isCorrect: body.isCorrect,
    question
  });
  await em.flush();

  response.status(200).json({ answer });
}

const handler = (
  request: NextApiRequest, response: NextApiResponse, em: DefaultEntityManager
) => handleRequest<UpsertAnswerBodyType>
(
  request, response, em,
  {
    post: { callback: post, private: true, bodyValidator: upsertAnswerBodySchema }
  }
);

export default withMikroOrm(handler);
