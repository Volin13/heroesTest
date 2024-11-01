import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteHero } from '../../../http/heroApi';
import { useDispatch, useSelector } from 'react-redux';
import { LIB_ROUTE } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { setSelectedHero } from '../../../redux/heroSlice';
import css from '../modals.module.css';
import { selectSelectedHero } from '../../../redux/heroSelectors';

const DeleteHeroModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedHero = useSelector(selectSelectedHero);

  const heroID = selectedHero?.id || '';
  const handleDeleteHeroClick = async () => {
    try {
      await deleteHero(heroID);

      dispatch(setSelectedHero(null));
      navigate(LIB_ROUTE);
      onHide();
    } catch (error) {
      console.error('Failed to delete hero:', error);
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={onHide}>
        <Modal.Header className={css.modalBackground} closeButton>
          <Modal.Title>
            Do you really want to delete {selectedHero?.nickname}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer className={css.modalBackground}>
          <Button variant="danger" onClick={onHide} className="mr-3">
            No
          </Button>
          <Button
            variant="warning"
            onClick={handleDeleteHeroClick} // Зміна на правильний хендлер
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteHeroModal;
