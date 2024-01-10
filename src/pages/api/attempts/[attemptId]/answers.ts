import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultEntityManager, withMikroOrm } from '../../../../core/mikro-orm/server';
import Answer from '../../../../core/mikro-orm/shared/entities/Answer';
import Attempt from '../../../../core/mikro-orm/shared/entities/Attempt';
import AttemptAnswer from '../../../../core/mikro-orm/shared/entities/AttemptAnswer';
import Question from '../../../../core/mikro-orm/shared/entities/Question';
import handleRequest, { CallbackWithBody } from '../../../../core/utils/server/handle-request';
import AttemptAnswerBodyType, { attemptAnswerBodySchema } from '../../../../modules/quiz/shared/types/AttemptAnswerBodyType';

const post: CallbackWithBody<AttemptAnswerBodyType> = async ({ request, response, em, body }) => {
  
  // Validate attempt id
  const attemptId = request.query.attemptId as string;
  if(!attemptId) {
    return response.status(200).json({ error: 'Invalid attempt id' });
  }
  
  // Validate attempt
  const attempt = await em.findOne(Attempt, { id: attemptId });
  if(!attempt) {
    return response.status(200).json({ error: 'Attempt not found' });
  }

  // Insert attempt answer
  const attemptAnswer = em.create(AttemptAnswer, {
    attempt,
    question: body.questionId,
    answer: body.answerId
  });
  await em.flush();

  // Find all attempt answers
  const attemptAnswers = await em.find(AttemptAnswer, { attempt });

  // Find next question
  const questions = await em.find(Question, {});
  if(questions) {
    const unansweredQuestions: Question[] = questions.filter(
      question => !(attemptAnswers.find(aq => aq.question.id === question.id))
    );
    attempt.nextQuestion = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
  }

  if(!attempt.nextQuestion) {
    attempt.endedAt = new Date();
  }

  await em.flush();
  attempt.nextQuestion = attempt.nextQuestion ? attempt.nextQuestion.id as any : null;

  // Get correct answers
  const answers = await em.find(Answer, { question: body.questionId });
  const correctAnswerIds: string[] = [];
  answers.forEach(answer => {
    if(answer.isCorrect) correctAnswerIds.push(answer.id);
  });
  
  // Find total correct answers count
  const correctAnswers = attemptAnswers.filter(aa => aa.answer.isCorrect);

  // Response
  response.status(200).json({
    attempt,
    totalQuesitons: questions.length,
    totalAnswered: attemptAnswers.length,
    totalCorrectAnswers: correctAnswers.length,
    correctAnswerIds
  });
}

const handler = (
  request: NextApiRequest, response: NextApiResponse, em: DefaultEntityManager
) => handleRequest<AttemptAnswerBodyType>
(
  request, response, em,
  {
    post: { callback: post, bodyValidator: attemptAnswerBodySchema }
  }
);

export default withMikroOrm(handler);
