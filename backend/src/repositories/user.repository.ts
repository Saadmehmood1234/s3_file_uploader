import pool from "../config/database.js";
import { CreateUserProps } from "../utils/types.js";

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `
      SELECT id, email, name, password_hash, is_verified
      FROM users
      WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
};

export const findUserById = async (id: string) => {
  const result = await pool.query(
    `
      SELECT id, email, name, is_verified, created_at
      FROM users
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

export const createUser = async (user: CreateUserProps) => {
  const query = `INSERT INTO users(
    name,
    email,
    password_hash
    ) VALUES ($1,$2,$3) RETURNING id,name,email,is_verified, created_at`;
    // verification_token_hash,
    // verification_token_expires_at
  const values = [
    user.name,
    user.email,
    user.password,
    // user.verification_token_hash,
    // user.verification_token_expires_at,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateVerificationToken = async (
  token: string,
  tokenExpiry: Date,
  userId: string,
) => {
  const query = `
    UPDATE users
    SET
      verification_token_hash = $1,
      verification_token_expires_at = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING id
  `;

  const result = await pool.query(query, [token, tokenExpiry, userId]);

  return result.rows[0];
};


export const verifyUserByToken = async (
  tokenHash: string
) => {
  const query = `
    UPDATE users
    SET
      is_verified = true,
      verification_token_hash = NULL,
      verification_token_expires_at = NULL,
      updated_at = CURRENT_TIMESTAMP
    WHERE verification_token_hash = $1
      AND verification_token_expires_at > CURRENT_TIMESTAMP
      AND is_verified = false
    RETURNING id, name, email, is_verified
  `;

  const result = await pool.query(query, [
    tokenHash,
  ]);

  return result.rows[0];
};