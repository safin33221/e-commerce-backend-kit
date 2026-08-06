import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/**
 * Hash plain text
 */
export const hash = async (plainText: string): Promise<string> => {
  return bcrypt.hash(plainText, SALT_ROUNDS);
};

/**
 * Compare hashed value
 */
export const compareHash = async (
  plainText: string,
  hashedValue: string
): Promise<boolean> => {
  return bcrypt.compare(plainText, hashedValue);
};