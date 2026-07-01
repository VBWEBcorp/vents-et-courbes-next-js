import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

export const R2_BUCKET = process.env.R2_BUCKET_NAME || '';
export const R2_PREFIX = process.env.R2_PREFIX || '';
export const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL || '').replace(/\/$/, '');

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 credentials are not set');
  }
  if (!client) {
    client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });
  }
  return client;
}

function withPrefix(key: string): string {
  const clean = key.replace(/^\/+/, '');
  return R2_PREFIX ? `${R2_PREFIX}/${clean}` : clean;
}

/** Public URL for a stored object key (already prefixed). */
export function publicUrl(prefixedKey: string): string {
  return `${R2_PUBLIC_URL}/${prefixedKey}`;
}

/** Upload a buffer to R2. Returns the object key and its public URL. */
export async function uploadObject(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string,
): Promise<{ key: string; url: string }> {
  const objectKey = withPrefix(key);
  await getClient().send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: objectKey,
      Body: body,
      ContentType: contentType,
    }),
  );
  return { key: objectKey, url: publicUrl(objectKey) };
}

/** Delete an object given its stored key OR its full public URL. */
export async function deleteObject(keyOrUrl: string): Promise<void> {
  let objectKey = keyOrUrl;
  if (R2_PUBLIC_URL && keyOrUrl.startsWith(R2_PUBLIC_URL)) {
    objectKey = keyOrUrl.slice(R2_PUBLIC_URL.length + 1);
  }
  await getClient().send(
    new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: objectKey }),
  );
}
