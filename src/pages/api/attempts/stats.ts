import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultEntityManager, withMikroOrm } from '../../../core/mikro-orm/server';
import Attempt from '../../../core/mikro-orm/shared/entities/Attempt';
import Question from '../../../core/mikro-orm/shared/entities/Question';
import handleRequest, { Callback, CallbackWithBody } from '../../../core/utils/server/handle-request';
import StartAttemptBodyType, { startAttemptBodySchema } from '../../../modules/quiz/shared/types/StartAttemptBodyType';

export type ResultType = {
  attemptId: string,
  name: string,
  email: string,
  totalCorrect: number,
  timeSpent?: number
}

const get: Callback = async ({ response, em }) => {
  const questions = await em.find(Question, {});
  const totalQuesitons = questions ? questions.length : 0;

  const attempts = await em.find(Attempt, {}, {
    populate: ['attemptAnswers.answer']
  });

  const results: ResultType[] = [];

  attempts.forEach(attempt => {
    const totalCorrectArr = attempt.attemptAnswers.toArray().map(aa => (aa.answer.isCorrect ? 1 : 0) as number);
    let totalCorrect = totalCorrectArr.length < 1 ? 0 : totalCorrectArr.reduce((a, b) => a + b);

    results.push({
      attemptId: attempt.id,
      name: attempt.name,
      email: attempt.email,
      totalCorrect,
      timeSpent: attempt.endedAt ? attempt.endedAt?.getTime() - attempt.createdAt.getTime() : undefined
    });
  });

  response.status(200).json({
    totalQuesitons,
    results
  });
}

const handler = (
  request: NextApiRequest, response: NextApiResponse, em: DefaultEntityManager
) => handleRequest<StartAttemptBodyType>
(
  request, response, em,
  {
    get: { callback: get, private: true }
  }
);

export default withMikroOrm(handler);
