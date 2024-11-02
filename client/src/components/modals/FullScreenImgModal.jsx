import React from 'react';
import { Modal } from 'react-bootstrap';

const FullScreenImgModal = ({ show, setShowModal, img }) => {
  return (
    <Modal
      show={show}
      fullscreen={true}
      onHide={() => {
        setShowModal(false);
      }}
    >
      <Modal.Header
        style={{ backgroundColor: '#212529' }}
        closeVariant="white"
        closeButton
      ></Modal.Header>
      <Modal.Body
        className="d-flex align-items-center justify-content-center"
        style={{ backgroundColor: '#212529' }}
      >
        <img
          style={{
            objectFit: 'contain',
            height: '100%',
          }}
          alt="heroPicture"
          src={process.env.REACT_APP_API_URL + '/' + img}
        />
      </Modal.Body>
    </Modal>
  );
};

export default FullScreenImgModal;
