import argon2 from 'argon2';

export async function generatePasswordHash(password: string): Promise<string> {
  return argon2.hash(password, {timeCost: 10});
}

export async function comparePasswordHash(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}
