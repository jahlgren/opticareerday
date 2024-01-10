import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultEntityManager, withMikroOrm } from '../../../core/mikro-orm/server';
import Attempt from '../../../core/mikro-orm/shared/entities/Attempt';
import Question from '../../../core/mikro-orm/shared/entities/Question';
import handleRequest, { CallbackWithBody } from '../../../core/utils/server/handle-request';
import StartAttemptBodyType, { startAttemptBodySchema } from '../../../modules/quiz/shared/types/StartAttemptBodyType';

const post: CallbackWithBody<StartAttemptBodyType> = async ({ response, em, body }) => {

  const questions = await em.find(Question, {});
  const nextQuestion = questions ? questions[Math.floor(Math.random() * questions.length)] : null;

  const attempt = em.create(Attempt, {
    name: body.name,
    email: body.email,
    nextQuestion
  });

  await em.flush();
  
  const totalQuesitons = await em.count(Question, {});
  // Todo: Find answered count

  response.status(200).json({ 
    attempt: { ...attempt, nextQuestion: attempt.nextQuestion?.id },
    totalQuesitons,
    totalAnswered: 0
  });
}

const handler = (
  request: NextApiRequest, response: NextApiResponse, em: DefaultEntityManager
) => handleRequest<StartAttemptBodyType>
(
  request, response, em,
  {
    post: { callback: post, bodyValidator: startAttemptBodySchema }
  }
);

export default withMikroOrm(handler);
