import React, { useState } from 'react';
import * as yup from 'yup';

import { Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import css from '../modals.module.css';
import addHeroData from '../../../utils/addHero';
import { createHero } from '../../../http/heroApi';
import Dropdowns from '../../UI/Form/Dropdowns';
import InputSection from '../../UI/Form/InputSection';
import SideImgSection from '../../UI/Form/SideImgSection';
import SuperpowersSection from '../../UI/Form/SuperpowersSection';
import CatchPhrasesSection from '../../UI/Form/CatchPhrasesSection';
import BtnGroup from '../../UI/Form/BtnGroup';
import { heroSchema } from '../../../utils/heroSchema';

const AddHeroModal = ({ show, onHide }) => {
  const [superpowers, setSuperpowers] = useState([]);
  const [catchPhrases, setCatchPhrases] = useState([]);
  const [heroImages, setHeroImages] = useState([]);

  // Зберегти додані і додати нову статтю в характеристики девайсу
  const addInfo = (changeFunc, arr, fieldName) => {
    changeFunc([...arr, { title: '', description: '', id: Date.now() }]);
    formik.setFieldValue(fieldName, JSON.stringify(arr));
  };
  // Видалити додану статтю характеристик девайсу
  const removeInfo = (id, changeFunc, arr, fieldName) => {
    changeFunc(arr.filter(i => i.id !== id));
    formik.setFieldValue(fieldName, JSON.stringify(arr));
  };

  // Змінити додану статтю характеристик девайсу
  const changeInfo = (key, value, id, changeFunc, arr) => {
    changeFunc(arr.map(i => (i.id === id ? { ...i, [key]: value.trim() } : i)));
  };

  // додати/видалити додані зображення девайсу
  const addImage = () => {
    setHeroImages([...heroImages, { heroImage: null, id: Date.now() }]);
    formik.setFieldValue('heroImages', heroImages);
  };
  const changeImages = (key, value, id) => {
    setHeroImages(
      heroImages.map(i => (i.id === id ? { ...i, [key]: value } : i)),
    );
  };
  const removeImage = id => {
    setHeroImages(heroImages.filter(i => i.id !== id));
    formik.setFieldValue('heroImages', heroImages);
  };
  // Додавання головного зображення
  const selectFile = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      formik.setFieldValue('mainImg', selectedFile);
    } else {
      formik.setFieldValue('mainImg', null);
    }
  };
  const hendleCloseBtn = () => {
    setSuperpowers([]);
    setCatchPhrases([]);
    setHeroImages([]);
    // formik.resetForm();
    // onHide();
  };
  const mainImgchema = yup.object().shape({
    mainImg: yup
      .mixed()
      .test('type', 'Only image files are allowed', value => {
        return (
          !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
        );
      })
      .test('size', 'Main img size has to be less then 5 MB', value => {
        return !value || (value && value.size <= 5000000);
      })
      .required('Add a hero main image'),
  });
  const formik = useFormik({
    initialValues: {
      real_name: '',
      nickname: '',
      species: '',
      alignment: '',
      sex: '',
      height: '',
      weight: '',
      age: '',
      mainImg: null,
      origin_description: '',
    },
    validationSchema: heroSchema.concat(mainImgchema),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      addHeroData(values, superpowers, catchPhrases, heroImages, createHero);
      setSuperpowers([]);
      setCatchPhrases([]);
      setHeroImages([]);
      setSubmitting(false);
      resetForm();
      onHide();
    },
  });
  const isValid = heroSchema.isValidSync(formik.values);

  return (
    <Modal fullscreen={true} show={show} onHide={onHide}>
      <Form
        onSubmit={e => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <Modal.Header
          className={css.modalBackground}
          closeButton
          closeVariant="white"
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add a new Hero
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={css.modalBody}>
          <Dropdowns formik={formik} />
          <InputSection formik={formik} selectFile={selectFile} />
          <SideImgSection
            text={'Add more images +'}
            heroImages={heroImages}
            addImage={addImage}
            removeImage={removeImage}
            changeImages={changeImages}
          />
          <SuperpowersSection
            superpowers={superpowers}
            setSuperpowers={setSuperpowers}
            changeInfo={changeInfo}
            removeInfo={removeInfo}
            addInfo={addInfo}
          />
          <CatchPhrasesSection
            catchPhrases={catchPhrases}
            setCatchPhrases={setCatchPhrases}
            changeInfo={changeInfo}
            removeInfo={removeInfo}
            addInfo={addInfo}
          />
        </Modal.Body>
        <Modal.Footer className={css.modalBackground}>
          <BtnGroup
            confirmText={'Add'}
            isValid={isValid}
            hendleCloseBtn={hendleCloseBtn}
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

AddHeroModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default AddHeroModal;
