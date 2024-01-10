import bcrypt from 'bcrypt';

const SALT_ROUNDS = 13;

export const generatePasswordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

export const comparePasswordHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
}
