import React from 'react';
import { Image, Modal } from 'react-bootstrap';

const FullScreenImgModal = ({ show, setShow, img }) => {
  return (
    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Image
          alt="superhero image"
          srс={process.env.REACT_APP_API_URL + '/' + img}
        />
      </Modal.Body>
    </Modal>
  );
};

export default FullScreenImgModal;
