import admin from "../../firebase";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name } = await request.json();
    const db = getFirestore();
    const photos = await db.collection("photos").doc(name).get();
    const data = photos.data();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.status(500).json({ error: "An error occurred while uploading the file." });
  }
}
