import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultEntityManager, withMikroOrm } from '../../../../core/mikro-orm/server';
import Question from '../../../../core/mikro-orm/shared/entities/Question';
import isUuid from '../../../../core/mikro-orm/shared/utils/is-uuid';
import handleRequest, { Callback, CallbackWithBody } from '../../../../core/utils/server/handle-request';
import EditQuestionBodyType, { editQuestionBodySchema } from '../../../../modules/quiz/shared/types/EditQuestionBodyType';

const get: Callback = async ({ request, response, em }) => {
  const questionId = request.query.questionId as string;
  if(!isUuid(questionId)) {
    return response.status(200).json({question: null});
  }
  const question = await em.findOne(Question, { id: questionId }, {
    populate: [ 'answers' ]
  });
  response.status(200).json({ question: question || null });
}

const post: CallbackWithBody<EditQuestionBodyType> = async ({ request, response, em, body }) => {
  const question = await em.findOne(Question, { id: request.query.questionId });
  if(!question) {
    return response.status(200).json({error: 'No question found with id: ' + request.query.questionId});
  }
  question.content = body;
  await em.flush();
  response.status(200).json({ question });
}

const del: Callback = async ({ request, response, em }) => {
  const questionId = request.query.questionId as string;
  if(!isUuid(questionId)) {
    return response.status(200).json({error: 'Invalid question id'});
  }
  const question = await em.findOne(Question, { id: questionId });
  if(!question) {
    return response.status(200).json({error: 'Question with id: ' + questionId + ', not found'});
  }
  em.remove(question);
  await em.flush();
  response.status(200).json({ question: { id: questionId } });
}

const handler = (
  request: NextApiRequest, response: NextApiResponse, em: DefaultEntityManager
) => handleRequest
(
  request, response, em,
  {
    get: { callback: get },
    post: { callback: post, private: true, bodyValidator: editQuestionBodySchema },
    delete: { callback: del, private: true }
  }
);

export default withMikroOrm(handler);
