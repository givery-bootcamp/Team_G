import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

//Upload image to AWS S3
export async function POST(request: Request) {
  const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, S3_BUCKET_NAME } = process.env;

  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID || "",
      secretAccessKey: SECRET_ACCESS_KEY || "",
    },
  });
  console.log("request:", request);

  const { searchParams } = new URL(request.url);

  const fileName = "a/" + searchParams.get("filename");
  console.log("fileName:", fileName);

  const formData = await request.formData();
  const file = formData.get("file") as File;

  // convert File to Buffer to show image correctly in the browser
  const buffer = Buffer.from(await file?.arrayBuffer());

  const uploadParams: PutObjectCommandInput = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName || "",
    Body: buffer,
    ContentType: "image/png",
    ACL: "public-read",
  };

  try {
    console.log("Uploading image to S3...");
    const command = new PutObjectCommand(uploadParams);
    const uploadResult = await s3Client.send(command);
    console.log("Upload success:", uploadResult);
    const imageUrl = `https://${S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`;
    console.log("imageUrl:", imageUrl);
    return NextResponse.json({ imageUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json(err);
  }
}
