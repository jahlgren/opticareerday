import { Knex } from 'knex';
import UserModel from './user-model';

export default function userDbQuery(connection: Knex) {
  return connection<UserModel>('app_user');
}
