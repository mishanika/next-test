"use client";
import Image from "next/image";
import styles from "./page.module.css";
import firstPhoto from "../../public/1.jpg";
import secondPhoto from "../../public/2.jpg";
import thirdPhoto from "../../public/3.jpg";
import fourthPhoto from "../../public/4.jpg";
import { useEffect, useState } from "react";
import PhotoPopup from "@/components/photoPopup/PhotoPopup";

const Main = () => {
  const [collection, setCollection] = useState([]);
  const [openedPhoto, setOpenedPhoto] = useState({ openedPreview: false, activePhoto: 0, collectionId: 0 });

  useEffect(() => {
    fetch("http://localhost:3000/api/photos")
      .then((data) => data.json())
      .then((data) => setCollection(data));
  }, []);

  const renderCollectionItems = ({ collectionName, previewURLS }, id) => (
    <div className={styles.colection_item}>
      <div className={styles.item_grid}>
        <img
          src={previewURLS[0]}
          alt="colletion item"
          className={styles.collection_preview_img}
          onClick={() => setOpenedPhoto((prev) => ({ activePhoto: 0, openedPreview: true, collectionId: id }))}
        />
        <div className={styles.bottom_img}>
          <img
            src={previewURLS[1]}
            alt="colletion item"
            className={styles.collection_preview_img}
            onClick={() => setOpenedPhoto((prev) => ({ activePhoto: 1, openedPreview: true, collectionId: id }))}
          />
          <img
            src={previewURLS[2]}
            alt="colletion item"
            className={styles.collection_preview_img}
            onClick={() => setOpenedPhoto((prev) => ({ activePhoto: 2, openedPreview: true, collectionId: id }))}
          />
          <img
            src={previewURLS[3]}
            alt="colletion item"
            className={styles.collection_preview_img}
            onClick={() => setOpenedPhoto((prev) => ({ activePhoto: 3, openedPreview: true, collectionId: id }))}
          />
        </div>
      </div>
      <div className={styles.collection_name}>
        {collectionName}{" "}
        <div
          className={styles.open_btn}
          onClick={() => setOpenedPhoto((prev) => ({ ...prev, openedCollection: true }))}
        >
          Open
        </div>
      </div>
    </div>
  );

  return (
    <>
      {openedPhoto.openedPreview ? (
        <PhotoPopup
          previewPhotos={collection[openedPhoto.collectionId].previewURLS}
          activePhoto={openedPhoto.activePhoto}
          setOpenedPhoto={setOpenedPhoto}
        />
      ) : (
        false
      )}
      <div className={styles.page_wrapper}>
        <div className={styles.page_inner_wrapper}>
          <div className={styles.header}>My photo collection</div>
          <div className={styles.filters}>
            <div className={styles.filter_item}>All</div>
            <div className={styles.filter_item}>Mountains</div>
            <div className={styles.filter_item}>Sea</div>
            <div className={styles.filter_item}>Architecture</div>
            <div className={styles.filter_item}>Cities</div>
            <input className={styles.search} placeholder="Enter collection name" />{" "}
          </div>
          <div className={styles.collection}>{collection.map(renderCollectionItems)}</div>
        </div>
      </div>
    </>
  );
};
export default Main;
