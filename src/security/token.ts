import { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "../shared/utils/jwt.js";
import { env } from "../config/env.js";



export interface TokenPayload extends JwtPayload {
  userId: string;
  role: string;
}

export const createAccessToken = (
  payload: TokenPayload
): string => {
  return generateToken(
    payload,
    env.JWT_ACCESS_SECRET,
    env.JWT_ACCESS_EXPIRES_IN as any
  );
};

export const createRefreshToken = (
  payload: TokenPayload
): string => {
  return generateToken(
    payload,
    env.JWT_REFRESH_SECRET,
    env.JWT_REFRESH_EXPIRES_IN as any
  );
};

// export const createEmailVerificationToken = (
//   payload: TokenPayload
// ): string => {
//   return generateToken(
//     payload,
//     env.JWT_VERIFY_EMAIL_SECRET,
//     env.JWT_VERIFY_EMAIL_EXPIRES_IN as any
//   );
// };

// export const createPasswordResetToken = (
//   payload: TokenPayload
// ): string => {
//   return generateToken(
//     payload,
//     (env as any).JWT_RESET_PASSWORD_SECRET,
//     env.JWT_RESET_PASSWORD_EXPIRES_IN as any
//   );
// };

// export const verifyAccessToken = (
//   token: string
// ): TokenPayload => {
//   return verifyToken<TokenPayload>(
//     token,
//     env.JWT_ACCESS_SECRET
//   );
// };

// export const verifyRefreshToken = (
//   token: string
// ): TokenPayload => {
//   return verifyToken<TokenPayload>(
//     token,
//     env.JWT_REFRESH_SECRET
//   );
// };

// export const verifyEmailVerificationToken = (
//   token: string
// ): TokenPayload => {
//   return verifyToken<TokenPayload>(
//     token,
//     env.JWT_VERIFY_EMAIL_SECRET
//   );
// };

// export const verifyPasswordResetToken = (
//   token: string
// ): TokenPayload => {
//   return verifyToken<TokenPayload>(
//     token,
//     (env as any).JWT_RESET_PASSWORD_SECRET
//   );
// };