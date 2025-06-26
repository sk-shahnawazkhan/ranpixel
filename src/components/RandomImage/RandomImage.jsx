import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import styles from "./RandomImage.module.css";

const RandomImage = () => {
  const [image, setImage] = useState({
    title: "Image title",
    caption: "Give a caption for the image",
    url: "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
    alt: "default image",
  });
  const [allImages, setAllImages] = useState([]);

  // const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    async function getImages() {
      // const res = await fetch(
      //   `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=30`
      // );
      const res = await fetch("/api/apiHandler");
      const data = await res.json();
      setAllImages(data);
    }
    getImages();
  }, []);

  function handleNewImageButton() {
    const randomNumber = Math.floor(Math.random() * allImages.length);
    let imgUrl = allImages[randomNumber].urls.small;
    let imgAlt = allImages[randomNumber].alt_description;
    setImage((prevState) => ({
      ...prevState,
      url: imgUrl,
      alt: imgAlt,
    }));
  }

  // function handleDownloadButton() {}
  const handleDownloadButton = async () => {
    const originalImage = image.url.split("?")[0];
    const imageLink = await fetch(originalImage);

    // Split image name
    const fileName = originalImage.split("/").pop();

    const imageBlog = await imageLink.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.setAttribute("download", fileName); // link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <figure>
            <img src={image.url} alt={image.alt} className={styles.image} />
            {/* <figcaption>
              <h4>{image.title}</h4>
              {image.caption}
            </figcaption> */}
          </figure>
        </div>
        <div className={styles.rightContainer}>
          <button
            className={`${styles.button} ${styles.btnNewImage}`}
            onClick={handleNewImageButton}
          >
            Get New Image
          </button>
          <button
            className={`${styles.button} ${styles.btnDownload}`}
            onClick={handleDownloadButton}
          >
            Download Image
          </button>
        </div>
      </div>
    </>
  );
};

export default RandomImage;
