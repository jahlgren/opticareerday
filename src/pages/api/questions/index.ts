import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultEntityManager, withMikroOrm } from '../../../core/mikro-orm/server';
import Question from '../../../core/mikro-orm/shared/entities/Question';
import handleRequest, { Callback, CallbackWithBody } from '../../../core/utils/server/handle-request';
import AddQuestionBodyType, { addQuestionBodySchema } from '../../../modules/quiz/shared/types/AddQuestionBodyType';

const get: Callback = async ({ response, em }) => {
  const questions = await em.find(Question, {});
  response.status(200).json({ questions });
}

const post: CallbackWithBody<AddQuestionBodyType> = async ({ response, em, body }) => {
  const question = em.create(Question, {
    content: { sv: body.sv, fi: body.fi }
  });
  await em.flush();
  response.status(200).json({ question });
}

const handler = (
  request: NextApiRequest, response: NextApiResponse, em: DefaultEntityManager
) => handleRequest<AddQuestionBodyType>
(
  request, response, em,
  {
    get: { callback: get },
    post: { callback: post, private: true, bodyValidator: addQuestionBodySchema }
  }
);

export default withMikroOrm(handler);
