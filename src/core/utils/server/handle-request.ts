import { EntityManager, Connection, IDatabaseDriver } from "@mikro-orm/core";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from 'yup';
import User from "../../mikro-orm/shared/entities/User";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

type EntityManagerType = EntityManager<IDatabaseDriver<Connection>>;

export type CallbackWithBody<T> = (props: { 
  request: NextApiRequest, response: NextApiResponse, em: EntityManagerType, body: T 
}) => Promise<any>;

export type Callback = (props: { 
  request: NextApiRequest, response: NextApiResponse, em: EntityManagerType 
}) => Promise<any>;

export type CallbackInfo<T> = { callback: T, private?: boolean, bodyValidator?: yup.AnySchema }

export type RequestCallbacks<TPost, TPut, TPatch> = {
  get?: CallbackInfo<Callback>,
  post?: CallbackInfo<CallbackWithBody<TPost>>,
  put?: CallbackInfo<CallbackWithBody<TPut>>,
  patch?: CallbackInfo<CallbackWithBody<TPatch>>,
  delete?: CallbackInfo<Callback>
}

const handleRequest = async <TPost = any, TPut = any, TPatch = any>(
  request: NextApiRequest, 
  response: NextApiResponse, 
  em: EntityManagerType,
  callbacks: RequestCallbacks<TPost, TPut, TPatch>
) => {
  const method = request.method ? callbacks[request.method.toLowerCase() as ('get'|'post'|'put'|'patch'|'delete')] : null;

  if(!method) return response.status(405).json({error: 'Method not allowed'})

  if(method.private) {
    const session = await getServerSession(request, response, authOptions);
    if(!session || !session.user) {
      return response.status(401).json({error: 'Permission denied'})
    }
    // @ts-ignore
    const user = await em.findOne(User, {id: session.user.id});
    if(!user) 
      return response.status(401).json({error: 'Permission denied'});
  }

  if(method.bodyValidator) {
    try {
      await method.bodyValidator.validate(request.body);
    }
    catch(e) {
      return response.status(400).json({error: 'Invalid request body'})
    }
  }

  await method.callback({ request, response, em, body: request.body });
}

export default handleRequest;
