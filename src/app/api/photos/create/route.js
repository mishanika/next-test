import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import admin from "../../firebase";
import process from "process";
import fs from "fs";

export async function POST(request) {
  try {
    const db = getFirestore();

    const { collectionName } = await request.json();

    const bucket = admin.storage().bucket("gs://photo-collection-81b14.appspot.com/");
    const filesInPhotos = await bucket.getFiles({ prefix: `${collectionName}/photos` });
    const filesInPreview = await bucket.getFiles({ prefix: `${collectionName}/preview` });

    const photoURLS = await Promise.all(
      filesInPhotos[0].map(
        async (file) =>
          (
            await file.getSignedUrl({
              action: "read",
              expires: "03-09-2491",
            })
          )[0]
      )
    );
    //console.log(photoURLS);

    const previewURLS = await Promise.all(
      filesInPreview[0].map(
        async (file) =>
          (
            await file.getSignedUrl({
              action: "read",
              expires: "03-09-2491",
            })
          )[0]
      )
    );
    //console.log(previewURLS);

    const res = await db.collection("photos").doc(collectionName).set({
      collectionName: collectionName,
      photoURLS: photoURLS,
      previewURLS: previewURLS,
    });

    return NextResponse.json({
      message: "ok",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.status(500).json({ error: "An error occurred while uploading the file." });
  }
}
