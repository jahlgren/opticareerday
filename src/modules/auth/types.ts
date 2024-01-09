export type Role = 'admin'|'viewer';

export interface TokenUser {
  id: number,
  username: string,
  name: string,
  role: Role
}
