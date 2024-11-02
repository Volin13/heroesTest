import React, { useState } from 'react';
import css from './Hero.module.css';
import FullScreenImgModal from '../modals/FullScreenImgModal';

const HeroPicrues = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {images?.length > 0 ? (
        <ul className={css.imagesList}>
          {images?.map(image => (
            <li
              className="d-flex justify-content-center "
              style={{ cursor: 'pointer' }}
              key={image.id}
            >
              <img
                onClick={() => {
                  setShowModal(image.id);
                }}
                alt="heroPicture"
                className={css.imagesListItem}
                src={process.env.REACT_APP_API_URL + '/' + image?.fileName}
              />
              {showModal === image.id && (
                <FullScreenImgModal
                  show={showModal}
                  setShowModal={setShowModal}
                  img={image?.fileName}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-center"> There is no images...yet</h2>
      )}
    </>
  );
};

export default HeroPicrues;
