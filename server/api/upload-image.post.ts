import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readMultipartFormData } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);
    const file = formData?.[0];
    if (!file) throw new Error('No file uploaded');

    const region = process.env.MY_AWS_REGION || 'ap-south-1';
    const bucketName = process.env.MY_S3_BUCKET_NAME;

    // ✅ Ensure credentials are defined (to satisfy TS)
    const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID ?? '';
    const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY ?? '';

    if (!accessKeyId || !secretAccessKey) {
      throw new Error('Missing AWS credentials in environment variables.');
    }

    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });

    const key = `uploads/${Date.now()}_${file.filename}`;

    await s3.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file.data,
      ContentType: file.type
    }));

    // Return CloudFront URL
    const imageUrl = `https://reader2-content-dev.comprodls.com/${key}`;
    return { link: imageUrl };
  } catch (error: unknown) {
    const message = error instanceof Error
      ? error.message
      : (typeof error === 'string' ? error : 'Unknown error');
    console.error('Upload error:', error);
    return { error: 'Upload failed: ' + message };
  }
});
