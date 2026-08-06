import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

/**
 * Generate JWT
 */
export const generateToken = <TPayload extends object>(
  payload: TPayload,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"]
): string => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

/**
 * Verify JWT
 */
export const verifyToken = <TPayload extends JwtPayload>(
  token: string,
  secret: Secret
): TPayload => {
  return jwt.verify(token, secret) as TPayload;
};

/**
 * Decode JWT (without verification)
 */
export const decodeToken = <TPayload extends JwtPayload>(
  token: string
): TPayload | null => {
  return jwt.decode(token) as TPayload | null;
};