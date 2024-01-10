import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultEntityManager, withMikroOrm } from '../../../core/mikro-orm/server';
import Attempt from '../../../core/mikro-orm/shared/entities/Attempt';
import handleRequest, { Callback } from '../../../core/utils/server/handle-request';

const del: Callback = async ({response, em}) => {
  await em.nativeDelete(Attempt, {});
  response.status(200).json({ok: true});
}

const handler = (
  request: NextApiRequest, response: NextApiResponse, em: DefaultEntityManager
) => handleRequest
(
  request, response, em,
  {
    delete: { callback: del }
  }
);

export default withMikroOrm(handler);
