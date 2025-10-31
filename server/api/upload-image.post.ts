// server/api/upload-image.post.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readMultipartFormData } from 'h3';
import fs from 'fs';

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);
    const file = formData?.[0];
    if (!file) throw new Error('No file uploaded');

    // Create S3 client - uses your local ~/.aws credentials automatically
    const s3 = new S3Client({ region: 'us-east-1' });

    // Upload file
    const uploadParams = {
      Bucket: 'reflowable-content-dev', // <-- replace with your actual bucket name
      Key: `uploads/${Date.now()}_${file.filename}`,
      Body: file.data,
      ContentType: file.type
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // ✅ Use CloudFront URL instead of direct S3 URL
    const imageUrl = `https://reader2-content-dev.comprodls.com/${uploadParams.Key}`;

    return { link: imageUrl };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: 'Upload failed: ' + error.message };
  }
});
