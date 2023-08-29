"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import PhotoPopup from "@/components/photoPopup/PhotoPopup";
import { useSearchParams } from "next/navigation";

const PhotoCollection = () => {
  const searchParams = useSearchParams();
  const [photos, setPhotos] = useState({ photoURLS: [] });
  const [openedPhoto, setOpenedPhoto] = useState({ openedPreview: false, activePhoto: 0 });

  useEffect(() => {
    fetch("http://localhost:3000/api/photos/certainCollection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: searchParams.get("collectionName") }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setPhotos(data);
      });
  }, []);

  const renderCollectionItems = (photo, id) => (
    <div className={styles.colection_item}>
      <img
        src={photo}
        alt="colletion item"
        className={styles.collection_preview_img}
        onClick={() => setOpenedPhoto({ openedPreview: true, activePhoto: id })}
      />
    </div>
  );

  return (
    <>
      {openedPhoto.openedPreview ? (
        <PhotoPopup activePhoto={openedPhoto.activePhoto} photos={photos.photoURLS} setOpenedPhoto={setOpenedPhoto} />
      ) : (
        false
      )}
      <div className={styles.photo_wrapper}>
        <div className={styles.photo_container}>{photos.photoURLS.map(renderCollectionItems)}</div>
      </div>
    </>
  );
};
export default PhotoCollection;
