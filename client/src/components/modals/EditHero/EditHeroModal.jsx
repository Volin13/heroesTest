import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import { Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import css from '../modals.module.css';
import addHeroData from '../../../utils/addHero';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedHero } from '../../../redux/heroSelectors';
import { updateHero } from '../../../http/heroApi';
import BtnGroup from '../../UI/Form/BtnGroup';
import CatchPhrasesSection from '../../UI/Form/CatchPhrasesSection';
import SuperpowersSection from '../../UI/Form/SuperpowersSection';
import SideImgSection from '../../UI/Form/SideImgSection';
import Dropdowns from '../../UI/Form/Dropdowns';
import { heroSchema } from '../../../utils/heroSchema';
import InputSection from '../../UI/Form/InputSection';
import { setSelectedHero } from '../../../redux/heroSlice';

const EditHeroModal = ({ show, onHide }) => {
  const selectedHero = useSelector(selectSelectedHero);
  const dispatch = useDispatch();

  const [superpowers, setSuperpowers] = useState([]);
  const [catchPhrases, setCatchPhrases] = useState([]);
  const [heroImages, setHeroImages] = useState([]);

  // Формую масив назв девайсів, які уже є для подальшої перевірки в схемі

  useEffect(() => {
    setSuperpowers(selectedHero.hero_superpowers);
    setCatchPhrases(selectedHero.catch_phrases);
    setHeroImages(selectedHero.heroImages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    formik.resetForm();
    onHide();
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
      .nullable()
      .notRequired(),
  });
  const formik = useFormik({
    initialValues: {
      real_name: selectedHero.real_name || '',
      nickname: selectedHero.nickname || '',
      species: selectedHero.species || '',
      alignment: selectedHero.alignment || '',
      sex: selectedHero.sex || '',
      height: Number(selectedHero.height) || '',
      weight: Number(selectedHero.weight) || '',
      age: selectedHero.age || '',
      mainImg: null,
      origin_description: selectedHero.origin_description || '',
    },
    validationSchema: heroSchema.concat(mainImgchema),
    onSubmit: async values => {
      const newHero = await addHeroData(
        values,
        superpowers,
        catchPhrases,
        heroImages,
        updateHero,
        selectedHero?.id,
      );

      dispatch(setSelectedHero(newHero));
      // onHide();
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
            Edit Hero
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={css.modalBody}>
          <Dropdowns formik={formik} />
          <InputSection formik={formik} selectFile={selectFile} />
          <SideImgSection
            text={'Edit/Add images +'}
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
            confirmText={'Edit'}
            isValid={isValid}
            hendleCloseBtn={hendleCloseBtn}
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditHeroModal;
