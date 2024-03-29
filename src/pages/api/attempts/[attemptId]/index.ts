import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultEntityManager, withMikroOrm } from '../../../../core/mikro-orm/server';
import Attempt from '../../../../core/mikro-orm/shared/entities/Attempt';
import AttemptAnswer from '../../../../core/mikro-orm/shared/entities/AttemptAnswer';
import Question from '../../../../core/mikro-orm/shared/entities/Question';
import isUuid from '../../../../core/mikro-orm/shared/utils/is-uuid';
import handleRequest, { Callback } from '../../../../core/utils/server/handle-request';
import { MAX_QUESTIONS } from '..';



const get: Callback = async ({ request, response, em }) => {
  const attemptId = request.query.attemptId as string;
  if(!attemptId) {
    return response.status(200).json({ attempt: null });
  }
  const attempt = await em.findOne(Attempt, { id: attemptId });
  if(!attempt) {
    return response.status(200).json({ attempt: null });
  }
  
  const totalQuesitons = Math.min(MAX_QUESTIONS, await em.count(Question, {}));
  const attemptAnswers = await em.find(AttemptAnswer, { attempt }, {
    populate: ['answer.id', 'answer.isCorrect']
  });

  // Fix null next question if we haven't answered all questions
  if(!attempt.nextQuestion) {
    const questions = await em.find(Question, {});
    const attemptAnswers = await em.find(AttemptAnswer, { attempt });
    if(questions && attemptAnswers.length < totalQuesitons) {
      const unansweredQuestions: Question[] = questions.filter(
        question => !(attemptAnswers.find(aq => aq.question.id === question.id))
      );
      attempt.nextQuestion = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
      await em.flush();
      attempt.nextQuestion = attempt.nextQuestion ? attempt.nextQuestion.id as any : null;
    }
  }

  // Find total correct answers count
  const correctAnswers = attemptAnswers.filter(aa => aa.answer.isCorrect);

  const data = { 
    attempt,
    totalQuesitons,
    totalAnswered: attemptAnswers.length,
    totalCorrectAnswers: correctAnswers.length
  };
  response.status(200).json(data);
}

const handler = (
  request: NextApiRequest, response: NextApiResponse, em: DefaultEntityManager
) => handleRequest
(
  request, response, em,
  {
    get: { callback: get }
  }
);

export default withMikroOrm(handler);
