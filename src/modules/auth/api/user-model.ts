import { Role } from '../types';

type UserModel = {
  id: number,
  createdAt: string,
  lastSignedInAt: string,
  name: string,
  username: string,
  password: string,
  role: Role,
  enabled: boolean
};

export default UserModel;
