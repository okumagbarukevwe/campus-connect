import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Hash the user's password before saving it to the database
 * @param password - The plaintext password to be hashed
 * @returns A hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare a plaintext password with a hashed password
 * @param password - The plaintext password
 * @param hashedPassword - The hashed password stored in the database
 * @returns A boolean indicating if the passwords match
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate a JWT token for authentication
 * @param payload - The data to be signed into the token
 * @returns A signed JWT token
 */
export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = "7d"; // Token expiry
  return jwt.sign(payload, secret, { expiresIn });
};
