// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import images from './data';
import { SRLWrapper } from 'simple-react-lightbox';
import Modal from 'react-responsive-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const options = {
  // your options here
};
const initialVisibleImages = 1;

function App() {
  const [filteredImages, setFilteredImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState(initialVisibleImages);
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setFilteredImages([...images]);
  }, []);

  const handlePrev = () => {
    setCurrentImage((prevImage) => (prevImage === 0 ? filteredImages.length - 1 : prevImage - 1));
  };

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage === filteredImages.length - 1 ? 0 : prevImage + 1));
  };

  const handleLoadMore = () => {
    setVisibleImages((prevVisibleImages) => prevVisibleImages + 1);
  };

  const handleImageClick = (index) => {
    if (index === visibleImages - 1) {
      // Handle image click here, e.g., open modal
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Create an array of objects for the image slider
  const imageSliderData = filteredImages.map((image) => (
    <div key={image.id}>
      <img src={`/images/${image.imageName}`} alt="" />
    </div>
  ));

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="App">
      <SRLWrapper options={options}>
        <div className="container">
          {filteredImages.map((image, index) => (
            <div key={index} className="image-card" onClick={() => handleImageClick(index)}>
              <a href={`/images/${image.imageName}`}>
                <img className="image" src={`/images/${image.imageName}`} alt="" />
                {index === visibleImages - 1 && visibleImages < filteredImages.length && (
                  <div className="load-more">
                    <span onClick={handleLoadMore}>+1 remaining</span>
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>
        <div className="navigation">
          <button onClick={handlePrev}>Prev</button>
          <span>
            {currentImage + 1} / {filteredImages.length}
          </span>
          <button onClick={handleNext}>Next</button>
        </div>
      </SRLWrapper>

      {/* Modal for displaying additional images */}
      <Modal open={modalOpen} onClose={handleCloseModal} center>
        <Slider {...sliderSettings}>{imageSliderData}</Slider>
      </Modal>
    </div>
  );
}
export default App;
