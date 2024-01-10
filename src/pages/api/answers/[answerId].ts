import { wrap } from '@mikro-orm/core';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultEntityManager, withMikroOrm } from '../../../core/mikro-orm/server';
import Answer from '../../../core/mikro-orm/shared/entities/Answer';
import isUuid from '../../../core/mikro-orm/shared/utils/is-uuid';
import handleRequest, { Callback, CallbackWithBody } from '../../../core/utils/server/handle-request';
import UpsertAnswerBodyType, { upsertAnswerBodySchema } from '../../../modules/quiz/shared/types/UpsertAnswerBodyType';

const post: CallbackWithBody<UpsertAnswerBodyType> = async ({ request, response, em, body }) => {
  const answerId = request.query.answerId as string;
  if(!isUuid(answerId)) {
    return response.status(200).json({error: 'Invalid answer id'});
  }

  let answer = await em.findOne(Answer, { id: answerId });
  wrap(answer).assign({
    content: { sv: body.sv, fi: body.fi },
    isCorrect: body.isCorrect
  });
  await em.flush();

  response.status(200).json({ answer });
}

const del: Callback = async ({ request, response, em }) => {
  const answerId = request.query.answerId as string;
  if(!isUuid(answerId)) {
    return response.status(200).json({error: 'Invalid answer id'});
  }
  const answer = await em.findOne(Answer, { id: answerId });
  if(!answer) {
    return response.status(200).json({error: 'Answer with id: ' + answerId + ', not found'});
  }
  em.remove(answer);
  await em.flush();
  response.status(200).json({ answerId, questionId: answer.question.id });
}

const handler = (
  request: NextApiRequest, response: NextApiResponse, em: DefaultEntityManager
) => handleRequest<UpsertAnswerBodyType>
(
  request, response, em,
  {
    post: { callback: post, private: true, bodyValidator: upsertAnswerBodySchema },
    delete: { callback: del, private: true }
  }
);

export default withMikroOrm(handler);
