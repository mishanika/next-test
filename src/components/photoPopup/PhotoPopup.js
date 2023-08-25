import Image from "next/image";
import styles from "./page.module.css";
import { useRef } from "react";

const PhotoPopup = ({ activePhoto, previewPhotos, setOpenedPhoto }) => {
  const popupRef = useRef(null);

  return (
    <div
      className={styles.popup_wrapper}
      ref={popupRef}
      onClick={(e) =>
        e.target === popupRef.current ? setOpenedPhoto({ activePhoto: 0, openedPreview: false }) : false
      }
    >
      <div className={styles.popup_inner_wrapper}>
        <Image
          src={previewPhotos[activePhoto]}
          alt="preview photo"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "100%", maxHeight: "80%" }}
        />
      </div>
    </div>
  );
};
export default PhotoPopup;
