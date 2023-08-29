import styles from "./page.module.css";
import { useRef, useState } from "react";

const PhotoPopup = ({ activePhoto, photos, setOpenedPhoto }) => {
  const popupRef = useRef(null);
  const [activePhotoInner, setActivePhotoInner] = useState(activePhoto);
  console.log(photos);
  return (
    <div
      className={styles.popup_wrapper}
      ref={popupRef}
      onClick={(e) =>
        e.target === popupRef.current ? setOpenedPhoto({ activePhoto: 0, openedPreview: false }) : false
      }
    >
      <div className={styles.popup_inner_wrapper}>
        <span
          onClick={() =>
            activePhotoInner - 1 <= 0 ? setActivePhotoInner(photos.length - 1) : setActivePhotoInner((prev) => prev - 1)
          }
        >
          {"<"}
        </span>
        <picture>
          <img
            src={photos[activePhotoInner]}
            alt="preview photo"
            sizes="100vw"
            style={{
              maxHeight: "85vh",
              padding: "50px 20px",

              background: "white",
            }}
          />
        </picture>
        <span
          onClick={() =>
            activePhotoInner + 1 >= photos.length ? setActivePhotoInner(0) : setActivePhotoInner((prev) => prev + 1)
          }
        >
          {">"}
        </span>
      </div>
    </div>
  );
};
export default PhotoPopup;
