export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  // verification_token_hash: string;
  // verification_token_expires_at: Date;
}

export interface AuthJwtPayload {
  userId: string;
}

export interface CreateFileProps {
  ownerId: string;
  originalName: string;
  storageKey: string;
  mimeType: string;
  size: number;
}
