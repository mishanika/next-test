"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRef, useState } from "react";

const PreviewChangePopup = ({ setPopup, setCollectionPreview }) => {
  const [collection, setCollection] = useState({});
  const popupRef = useRef(null);
  const save = () => {
    const data = Object.values(collection).map((item) => item[0]);
    console.log(data);
    setCollectionPreview([...data]);
    setPopup((prev) => ({ ...prev, popupTitle: false }));
  };

  return (
    <div
      className={styles.popup_wrapper}
      ref={popupRef}
      onClick={(e) => (e.target === popupRef.current ? setPopup((prev) => ({ ...prev, popupPreview: false })) : false)}
    >
      <div className={styles.popup_inner_wrapper}>
        <div className={styles.dragndrop}>
          <input
            type="file"
            onChange={(e) => setCollection((prev) => ({ ...prev, 0: { ...e.target.files } }))}
            className={styles.input_file.popup_top}
          />
          <span>Insert first photo</span>
        </div>
        <div className={styles.popup_bottom}>
          <div className={styles.dragndrop}>
            <input
              type="file"
              onChange={(e) => setCollection((prev) => ({ ...prev, 1: { ...e.target.files } }))}
              className={styles.input_file}
            />
            <span>Insert second photo</span>
          </div>
          <div className={styles.dragndrop}>
            <input
              type="file"
              onChange={(e) => setCollection((prev) => ({ ...prev, 2: { ...e.target.files[0] } }))}
              className={styles.input_file}
            />
            <span>Insert third photo</span>
          </div>
          <div className={styles.dragndrop}>
            <input
              type="file"
              onChange={(e) => setCollection((prev) => ({ ...prev, 3: { ...e.target.files[0] } }))}
              className={styles.input_file}
            />
            <span>Insert fourth photo</span>
          </div>
        </div>
        <div className={styles.popup_btn} onClick={() => save()}>
          Save the preview
        </div>
      </div>
    </div>
  );
};
export default PreviewChangePopup;
