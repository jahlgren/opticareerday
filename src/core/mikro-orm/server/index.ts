import { Connection, EntityManager, IDatabaseDriver, MikroORM, RequestContext } from '@mikro-orm/core';
import { NextApiRequest, NextApiResponse } from 'next';
import config from './config';
import { getSession } from 'next-auth/react';

export declare type DefaultEntityManager = EntityManager<IDatabaseDriver<Connection>>;
export declare type NextMikroOrmApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>, em: DefaultEntityManager) => unknown | Promise<unknown>;

let establishingDbConnection = false;

export const getMikroOrmInstance = async () => {
  // @ts-ignore
  if (!global.__MIKRO_ORM__){
    establishingDbConnection = true;
    console.log('Creating Mikro ORM instance.');
    // @ts-ignore
    global.__MIKRO_ORM__ = await MikroORM.init(config);
    establishingDbConnection = false;
  }
  // @ts-ignore
  return global.__MIKRO_ORM__ as MikroORM<IDatabaseDriver<Connection>>;
};

export const getEntityManager = () => {
  const em = RequestContext.getEntityManager();
  if (!em) throw new Error("Entity manager not found. Are you in a 'withMikroOrm'-wrapped Context?");
  return em;
}

export const withMikroOrm = (handler: NextMikroOrmApiHandler) => async (req: NextApiRequest, res: NextApiResponse, em: DefaultEntityManager) => {
  if(establishingDbConnection) {
    return res.status(503).json({ error: 'Service Unavailable, wait and try again' });
  }
  const orm = await getMikroOrmInstance();
  return RequestContext.createAsync(orm.em, async () => await handler(req, res, getEntityManager()));
}
