"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import TitleChangePopup from "@/components/titleChangePopup/TitleChangePopup";
import PreviewChangePopup from "@/components/previewChangePopup/PreviewChangePopup";

const AdminPage = () => {
  const [selectedFiles, setSelectedFile] = useState([]);
  const [collectionPreview, setCollectionPreview] = useState([]);
  const [name, setName] = useState("");
  const [popup, setPopup] = useState({ popupTitle: false, popupPreview: false });

  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.reset();
  }, [selectedFiles]);

  const handleUpload = async () => {
    if (collectionPreview.length < 4) {
      alert("Upload preview");
      return;
    }
    if (selectedFiles) {
      const collection = new FormData();
      const preview = new FormData();
      //const combineData = new FormData();

      const dataToPushCol = Array.from(selectedFiles);
      const dataToPushPrev = Array.from(collectionPreview);

      dataToPushCol.forEach((image) => collection.append(image.name, image, name));
      dataToPushPrev.forEach((image) => preview.append(image.name, image, name));
      //formData.append("files", dataToPush);
      //combineData.append("collection", collection);
      //combineData.append("preview", preview);
      console.log(dataToPushCol);

      try {
        const responsePhoto = await fetch("http://localhost:3000/api/photos", {
          method: "POST",
          body: collection,
        });

        const responsePreview = await fetch("http://localhost:3000/api/photos/collectionPreview", {
          method: "POST",
          body: preview,
        });

        const create = await fetch("http://localhost:3000/api/photos/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionName: name,
          }),
        });

        //const data = await response.json();
        console.log("File uploaded successfully:", data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const queueRender = (image, i) => (
    <div className={styles.queue_item}>
      <img src={URL.createObjectURL(image)} alt="" srcset="" />
      <span className={styles.xmark} onClick={() => deleteFromQueue(i)}>
        &times;
      </span>
    </div>
  );

  const deleteFromQueue = (i) => {
    const temp = selectedFiles;
    temp.splice(i, 1);
    setSelectedFile([...temp]);
  };

  const collectionPreviewRender = (image, i) => (
    <div className={styles.queue_item}>
      <img src={URL.createObjectURL(image)} alt="" srcset="" />
      <span className={styles.xmark} onClick={() => deleteFromCollectionPreview(i)}>
        &times;
      </span>
    </div>
  );

  const deleteFromCollectionPreview = (i) => {
    const temp = collectionPreview;
    temp.splice(i, 1);
    setCollectionPreview([...temp]);
  };

  return (
    <>
      {popup.popupTitle ? <TitleChangePopup name={name} setName={setName} setPopup={setPopup} /> : false}
      {popup.popupPreview ? (
        <PreviewChangePopup setPopup={setPopup} setCollectionPreview={setCollectionPreview} />
      ) : (
        false
      )}
      <div className={styles.page_wrapper}>
        <form className={styles.dragndrop_wrapper} ref={formRef}>
          <span>Upload photos</span>
          <div className={styles.dragndrop}>
            <input
              type="file"
              name=""
              id=""
              multiple
              onChange={(e) => setSelectedFile((prev) => [...prev, ...e.target.files])}
            />
            <span>Click and choose files or drag and drop them</span>
          </div>
          <div className={styles.dragndrop} onClick={() => setPopup((prev) => ({ ...prev, popupPreview: true }))}>
            {/* <input type="file" name="" id="" multiple onChange={(e) => handleFileChange(e, "preview")} /> */}
            <span>Click and choose files</span>
          </div>
          <div className={styles.btn_wrapper}>
            <span> Photo for site collection preview</span>
            <div className={styles.btns_wrapper}>
              <div onClick={() => setPopup((prev) => ({ ...prev, popupTitle: true }))} className={styles.send_btn}>
                Change Title
              </div>
              <div onClick={() => handleUpload()} className={styles.send_btn}>
                Upload
              </div>
            </div>
          </div>
          <div className={styles.queue}>{collectionPreview.map(collectionPreviewRender)}</div>
          <span>Preview</span>

          <div className={styles.queue}>{selectedFiles.map(queueRender)}</div>
        </form>
      </div>
    </>
  );
};
export default AdminPage;
