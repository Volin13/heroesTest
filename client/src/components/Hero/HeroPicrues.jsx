import React, { useState } from 'react';
import css from './Hero.module.css';
import FullScreenImgModal from '../modals/FullScreenImgModal';

const HeroPicrues = ({ images }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {images?.length > 0 ? (
        <ul className={css.imagesList}>
          {images?.map(image => (
            <li key={image.id} onClick={() => setShow(true)}>
              <img
                alt="heroPicture"
                className={css.imagesListItem}
                srс="../../assets/other/superhero-svgrepo-com.svg"
                // srс={process.env.REACT_APP_API_URL + '/' + image?.fileName}
              />
              {show && <FullScreenImgModal img={image?.fileName} />}
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
