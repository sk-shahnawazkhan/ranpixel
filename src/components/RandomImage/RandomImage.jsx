import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./RandomImage.module.css";

const RandomImage = () => {
  const [image, setImage] = React.useState({
    title: "Image title",
    caption: "Give a caption for the image",
    url: "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
    isButtonDisabled: true,
  });

  const [count, setCount] = useState(0);
  const [allImages, setAllImages] = React.useState([]);

  const apiKey = import.meta.env.VITE_RANDOMIMAGE_KEY;

  React.useEffect(() => {
    async function getImages() {
      const res = await fetch(
        `https://api.unsplash.com/photos?client_id=${apiKey}`
      );
      const data = await res.json();
      setAllImages(data);
    }
    getImages();
  }, []);

  function handleCaptionButton() {
    setImage((prevState) => ({
      ...prevState,
      caption: imageCaption.value,
    }));
    setCount((pevCount) => pevCount + 1);
  }

  function handleNewImageButton() {
    const randomNumber = Math.floor(Math.random() * allImages.length);
    let imgUrl = allImages[randomNumber].urls.small;
    setImage((prevState) => ({
      ...prevState,
      url: imgUrl,
    }));
  }

  // function handleDownloadButton() {}
  const handleDownloadButton = async () => {
    const originalImage = image.url.split("?")[0];
    const imageLink = await fetch(originalImage);
    console.log(imageLink);

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

  function handleInputChange(event) {
    const imageTitle = event.target.value;
    setImage((prevState) => ({
      ...prevState,
      title: imageTitle.length === 0 ? "Image title" : imageTitle,
    }));
  }

  function handleCaptionChange(event) {
    const captionValue = event.target.value;
    setImage((prevState) => ({
      ...prevState,
      isButtonDisabled: captionValue.length === 0,
    }));
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <figure>
            <img src={image.url} alt="Image" className={styles.image} />
            <figcaption>
              <h4>{image.title}</h4>
              {image.caption}
            </figcaption>
          </figure>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.w100}>
            <input
              type="text"
              name="imageTitle"
              id="imageTitle"
              className={styles.imageTitle}
              placeholder="Type image title..."
              onChange={handleInputChange}
            />
            <textarea
              name="imageCaption"
              id="imageCaption"
              placeholder="Write a image caption..."
              onChange={handleCaptionChange}
            ></textarea>
            <button
              className={
                image.isButtonDisabled
                  ? `${styles.button} ${styles.btnCaption} ${styles.btnDisabled}`
                  : `${styles.button} ${styles.btnCaption}`
              }
              disabled={image.isButtonDisabled}
              onClick={handleCaptionButton}
            >
              {count === 0 ? "Add Image Caption" : "Update Image Caption"}
            </button>
          </div>
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
