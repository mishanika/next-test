import { NextRequest, NextResponse } from "next/server";
import admin from "../../firebase";
import process from "process";
import fs from "fs";

export const config = {
  runtime: "nodejs",
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const formDataEntryValues = Array.from(formData.values());
    const bucket = admin.storage().bucket("gs://photo-collection-81b14.appspot.com/");

    for (const formDataEntryValue of formDataEntryValues) {
      if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
        const file = formDataEntryValue;
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = Date.now() + "." + file.type.split("/")[1];
        const relativeUploadDir = `${process.cwd()}/public/` + fileName;

        fs.writeFileSync(relativeUploadDir, buffer); // Save the file to a temporary location

        const fileUploadOptions = {
          destination: `${file.name}/preview/${fileName}`,
          metadata: {
            contentType: file.type,
          },
        };

        await bucket.upload(relativeUploadDir, fileUploadOptions);

        fs.unlinkSync(relativeUploadDir); // Save the file to a temporary location
      }
    }

    return NextResponse.json({ message: "File uploaded to Firebase Storage." });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.status(500).json({ error: "An error occurred while uploading the file." });
  }
}
