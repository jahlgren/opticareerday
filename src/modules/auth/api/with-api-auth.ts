import { NextRequest } from "next/server";
import { Role } from "../types";
import getServerSession from "./get-server-session";
import getConnection from "@/database/connection";
import userDbQuery from "./user-db-query";
import UserModel from "./user-model";

const withApiAuth = (roles: Role[], handler: (request: Request|NextRequest) => void) => async (request: NextRequest) => {
  const session = await getServerSession();

  if(!session || !session.user)
    return new Response(JSON.stringify({message: 'Access denied'}), { status: 401 })

  const connection = getConnection();
  let user: Partial<UserModel>|undefined;
  try {
    user = (
      await userDbQuery(connection)
        .select('id', 'role', 'enabled')
        .where({id: session.user.id})
        .limit(1).first()
    );
  }
  catch(error) { console.log(error); return new Response(JSON.stringify({message: 'Server error'}), {status: 500}) }

  if(!user || !user.enabled)
    return new Response(JSON.stringify({error: true, message: 'Access denied'}), { status: 401 })

  if(roles.length > 0 && roles.indexOf(user.role!) < 0)
    return new Response(JSON.stringify({error: true, message: 'Access denied'}), { status: 401 })

  return handler(request);
}

export default withApiAuth;
