import crypto from "crypto";

export const generateSalt = () => crypto.randomBytes(16).toString("hex");
export const hashPassword = (password: string, salt: string) =>
  crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

export const isPasswordValid = (password: string, salt: string, hash: string) =>
  hash ===
  crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
