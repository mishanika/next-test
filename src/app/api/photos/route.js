import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import admin from "../firebase";
import path from "path";
import * as dateFn from "date-fns";
import process from "process";
import fs from "fs";
import { getFirestore } from "firebase-admin/firestore";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  const db = getFirestore();
  const photos = await db.collection("photos").limit(3).get();
  const data = photos.docs.map((item) => item.data());

  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    //const { collection, preview } = request.formData;
    // Get file from formData
    // const file = formData.get("file");
    // console.log(file);
    // if (file instanceof Blob) {
    //   // Convert file to stream
    //   const stream = file.stream();

    //   // Convert stream to buffer
    //   const chunks = [];
    //   for await (const chunk of stream) {
    //     chunks.push(chunk);
    //   }
    //   const buffer = Buffer.concat(chunks);
    //   fs.writeFileSync(`${process.cwd()}/public/` + Date.now() + "." + file.type.split("/")[1], buffer);
    // }

    //console.log("-----------", await request.formData());
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
          destination: `${file.name}/photos/${fileName}`,
          metadata: {
            contentType: file.type,
          },
        };

        await bucket.upload(relativeUploadDir, fileUploadOptions);

        fs.unlinkSync(relativeUploadDir); // Save the file to a temporary location
      }
    }
    // console.log("-----------------------", formData);

    // Delete the temporary file

    return NextResponse.json({ message: "File uploaded to Firebase Storage." });
    // });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.status(500).json({ error: "An error occurred while uploading the file." });
  }
}
