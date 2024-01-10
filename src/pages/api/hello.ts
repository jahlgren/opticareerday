// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DefaultEntityManager, withMikroOrm } from '../../core/mikro-orm/server';

const handler = (req: NextApiRequest, res: NextApiResponse, em: DefaultEntityManager) => {
  res.status(200).json({ message: 'Hello' });
}

export default withMikroOrm(handler);
