import {getServerSession as nextGetServerSession} from 'next-auth';
import { authOptions } from './nextauth-route';

export default function getServerSession() {
  return nextGetServerSession(authOptions);
}
