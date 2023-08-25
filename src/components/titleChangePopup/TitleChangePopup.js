import { useRef } from "react";
import styles from "./page.module.css";

const TitleChangePopup = ({ name, setName, setPopup }) => {
  const popupRef = useRef(null);

  return (
    <div
      className={styles.popup_wrapper}
      ref={popupRef}
      onClick={(e) => (e.target === popupRef.current ? setPopup((prev) => ({ ...prev, popupTitle: false })) : false)}
    >
      <div className={styles.popup_inner_wrapper}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className={styles.popup_input}
          placeholder={name}
        />
        <div className={styles.popup_btn} onClick={() => setPopup((prev) => ({ ...prev, popupTitle: false }))}>
          Save the title
        </div>
      </div>
    </div>
  );
};
export default TitleChangePopup;
