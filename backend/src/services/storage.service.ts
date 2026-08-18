import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3 } from "../config/s3.js";
import { env } from "../config/env.js";

export const generateUploadUrl = async (
  key: string,
  contentType: string,
) => {
  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3, command, {
    expiresIn: 5 * 60,
  });
};


export const verifyObjectExists = async (
  key: string
) => {
  const command = new HeadObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
  });

  return s3.send(command);
};


export const generateDownloadUrl = async (
  key: string,
  fileName: string,
) => {
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,

    ResponseContentDisposition: `attachment; filename="${encodeURIComponent(
      fileName,
    )}"`,
  });

  return getSignedUrl(s3, command, {
    expiresIn: 5 * 60,
  });
};


export const deleteS3Object = async (
  key: string
) => {
  const command = new DeleteObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
  });

  await s3.send(command);
};

export const getFilePreviewUrl = async (
  storageKey: string,
  mimeType?: string,
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: storageKey,
    ResponseContentType: mimeType,
    ResponseContentDisposition: "inline",
  });

  return getSignedUrl(s3, command, {
    expiresIn: 15 * 60,
  });
};