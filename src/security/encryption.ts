import crypto from "crypto";
import { env } from "../config/env.js";


const ALGORITHM = "aes-256-gcm";

const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(env.ENCRYPTION_SECRET)
  .digest();

const IV_LENGTH = 16;

/**
 * Encrypt plain text
 */
export const encrypt = (plainText: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(
    ALGORITHM,
    ENCRYPTION_KEY,
    iv
  );

  let encrypted = cipher.update(
    plainText,
    "utf8",
    "hex"
  );

  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted,
  ].join(":");
};

/**
 * Decrypt encrypted text
 */
export const decrypt = (
  encryptedText: string
): string => {
  const [ivHex, authTagHex, encrypted] =
    encryptedText.split(":");

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    ENCRYPTION_KEY,
    Buffer.from(ivHex, "hex")
  );

  decipher.setAuthTag(
    Buffer.from(authTagHex, "hex")
  );

  let decrypted = decipher.update(
    encrypted,
    "hex",
    "utf8"
  );

  decrypted += decipher.final("utf8");

  return decrypted;
};