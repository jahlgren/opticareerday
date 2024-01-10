// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import uuid from "binary-uuid";
import type { NextApiRequest, NextApiResponse } from 'next'
import { generatePasswordHash } from '../../../core/utils/server/password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = uuid().uuid;
  const pw = await generatePasswordHash(req.query.pw as string);
  res.status(200).json({ pw: req.query.pw, pwHash: pw, uuid: id });
}

export default handler;
