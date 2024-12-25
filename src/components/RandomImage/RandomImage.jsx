import React from "react";
import Header from "../Header/Header";
import styles from "./RandomImage.module.css";

const RandomImage = () => {
  const [image, setImage] = React.useState({
    caption: "Image caption",
    title: "Title",
    showImage: "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
  });

  const [allImages, setAllImages] = React.useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;

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

  function getNewImage() {
    const randomNumber = Math.floor(Math.random() * allImages.length);
    let imgUrl = allImages[randomNumber].urls.raw;
    setImage((prevState) => ({
      ...prevState,
      showImage: imgUrl,
    }));
  }

  // function downloadImage() {}

  const downloadImage = async () => {
    const originalImage = image.showImage.split("?")[0];
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

  function handleAddCaption() {
    setImage((prevState) => ({
      ...prevState,
      caption: txtAreaCaption.value,
    }));
    // txtAreaCaption.value = "";
  }

  function handleChange(event) {
    setImage((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <figure>
            <img
              src={image.showImage}
              alt="Image"
              width={"100%"}
              height={"500px"}
            />
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
              name="txtImageTitle"
              id="txtImageTitle"
              className={styles.txtImageTitle}
              placeholder="Add Image Title..."
              onChange={handleChange}
            />
            <textarea name="txtAreaCaption" id="txtAreaCaption"></textarea>
            <button
              className={`${styles.button} ${styles.btnCaption}`}
              onClick={handleAddCaption}
            >
              Add Image Caption
            </button>
          </div>
          <button
            className={`${styles.button} ${styles.btnImage}`}
            onClick={getNewImage}
          >
            Get New Image
          </button>
          <button
            className={`${styles.button} ${styles.btnDownload}`}
            onClick={downloadImage}
          >
            Download Image
          </button>
        </div>
      </div>
    </>
  );
};

export default RandomImage;
