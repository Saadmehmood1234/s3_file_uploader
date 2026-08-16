import pool from "../config/database.js";
import { CreateFileProps } from "../utils/types.js";

export const createFile = async (file: CreateFileProps) => {
  const query = `
    INSERT INTO files(
    owner_id,
    original_name,
    storage_key,
    mime_type,
    size,
    visibility,
    status
    ) VALUES($1,$2,$3,$4,$5,'private','pending')
     RETURNING id,original_name,mime_type,size,visibility,status,created_at
    `;
  const values = [
    file.ownerId,
    file.originalName,
    file.storageKey,
    file.mimeType,
    file.size,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getUserFile = async (ownerId: string) => {
  const result = await pool.query(
    `
    SELECT
      id,
      original_name,
      mime_type,
      size,
      visibility,
      is_important,
      status,
      created_at,
      updated_at
    FROM files
    WHERE owner_id = $1
    ORDER BY created_at DESC
    `,
    [ownerId],
  );

  return result.rows;
};

export const findOwnedFile = async (id: string, ownerId: string) => {
  const result = await pool.query(
    `
        SELECT * FROM files WHERE id=$1 AND owner_id=$2
        `,
    [id, ownerId],
  );
  return result.rows[0];
};

export const markFileUpload = async (id: string) => {
  const query = `
    UPDATE files
    SET
      status = 'uploaded',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const updateVisibility = async (
  id: string,
  ownerId: string,
  visibility: "public" | "private",
) => {
  const result = await pool.query(
    `
      UPDATE files
      SET
        visibility = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
        AND owner_id = $3
        AND status = 'uploaded'
      RETURNING *
    `,
    [visibility, id, ownerId],
  );

  return result.rows[0];
};

export const updateImportant = async (
  id: string,
  ownerId: string,
  important: boolean,
) => {
  const result = await pool.query(
    `
      UPDATE files
      SET
        is_important = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
        AND owner_id = $3
        AND status = 'uploaded'
      RETURNING *
    `,
    [important, id, ownerId],
  );

  return result.rows[0];
};
export const findPublicFile = async (id: string) => {
  const query = `
    SELECT *
    FROM files
    WHERE id = $1
      AND visibility = 'public'
      AND status = 'uploaded'
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const deleteFileRecord = async (
  id: string,
  ownerId: string
) => {
  const result = await pool.query(
    `
      DELETE FROM files
      WHERE id = $1
        AND owner_id = $2
      RETURNING id
    `,
    [id, ownerId]
  );

  return result.rows[0];
};

export const renameOwnedFile = async (
  id: string,
  ownerId: string,
  name: string,
) => {
  const result = await pool.query(
    `
      UPDATE files
      SET
        original_name = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
        AND owner_id = $3
        AND status = 'uploaded'
      RETURNING *
    `,
    [name, id, ownerId],
  );

  return result.rows[0];
};