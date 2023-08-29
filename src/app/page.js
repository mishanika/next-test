"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import PhotoPopup from "@/components/photoPopup/PhotoPopup";
import Link from "next/link";
import { filterText } from "@/text/mainText";

const Main = () => {
  const tagsRef = useRef([]);
  const [collection, setCollection] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchedCollections, setSearchedCollections] = useState(null);
  const [openedPhoto, setOpenedPhoto] = useState({ openedPreview: false, activePhoto: 0, collectionId: 0 });

  useEffect(() => {
    fetch("http://localhost:3000/api/photos")
      .then((data) => data.json())
      .then((data) => setCollection(data));
  }, []);

  const searchByTags = (e) => {
    e.target.classList.toggle("active_filter");
    const actives = tagsRef.current.filter((item) => item.classList.contains("active_filter"));
    console.log(actives);

    if (e.target.textContent === "All" || !actives.length) {
      tagsRef.current.forEach((item) => item.classList.remove("active_filter"));
      setSearchedCollections(null);
      return;
    }

    setSearchedCollections(
      collection.filter((item) => actives.some((tag) => item.tags.includes(tag.textContent.toLowerCase())))
    );
  };

  const searchByText = () => {
    setSearchedCollections(
      collection.filter((item) => item.collectionName.toLowerCase().includes(searchInput.toLowerCase()))
    );
  };

  const debounce = (func, timeoutMs) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(func(...args), timeoutMs);
    };
  };
  const hello = () => {
    console.log("hello");
  };
  const searchWithDebounce = debounce(hello, 3000);

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
    searchWithDebounce();
  };

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
        <Link
          href={{
            pathname: "/photoCollection",
            query: { collectionName: collectionName },
          }}
        >
          <div className={styles.open_btn}>Open</div>
        </Link>
      </div>
    </div>
  );

  const filterRender = (item, i) => (
    <div className={styles.filter_item} ref={(el) => (tagsRef.current[i] = el)} onClick={(e) => searchByTags(e)}>
      {item}
    </div>
  );

  return (
    <>
      {openedPhoto.openedPreview ? (
        <PhotoPopup
          photos={collection[openedPhoto.collectionId].previewURLS}
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
            {filterText.map(filterRender)}
            <input
              className={styles.search}
              placeholder="Enter collection name"
              onChange={(e) => inputHandler(e)}
            />{" "}
          </div>
          <div className={styles.collection}>
            {searchedCollections
              ? searchedCollections.map(renderCollectionItems)
              : collection.map(renderCollectionItems)}
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
