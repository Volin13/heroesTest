import React, { useEffect, useState } from 'react';

import * as yup from 'yup';
import {
  Col,
  InputGroup,
  Row,
  Form,
  Button,
  Modal,
  Dropdown,
  Image,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import css from '../modals.module.css';
import addHeroData from '../../../utils/addHero';
import heroDefultImg from '../../../assets/other/superhero-svgrepo-com.svg';
import { useSelector } from 'react-redux';
import { selectSelectedHero } from '../../../redux/heroSelectors';
import { updateHero } from '../../../http/heroApi';

const EditHeroModal = ({ show, onHide }) => {
  const selectedHero = useSelector(selectSelectedHero);

  const [superpowers, setSuperpowers] = useState([]);
  const [catchPhrases, setCatchPhrases] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const alignmentTypes = ['Good', 'Evil', 'Neutral'];
  const sexTypes = ['Male', 'Femail', 'Unknown'];

  // Формую масив назв девайсів, які уже є для подальшої перевірки в схемі
  console.log(superpowers);
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
    changeFunc(arr.map(i => (i.id === id ? { ...i, [key]: value } : i)));
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

  const numberValidation = yup
    .number('The value has to be a number')
    .positive('The value has to be a positive number')
    .integer('The value has to be an integer')
    .required('Pls add a value');

  let heroSchema = yup.object().shape({
    real_name: yup
      .string()
      .trim()
      .max(80, 'This hero name is too long')
      .required('Add a hero real name'),
    nickname: yup
      .string()
      .trim()
      .max(80, 'This hero name is too long')
      .lowercase()
      .required('Add a hero real nickname'),
    alignment: yup.string().required('Chose hero`s alignment'),
    species: yup.string().required('Chose hero`s species'),
    sex: yup.string().required('Chose hero`s sex'),
    age: numberValidation,
    height: numberValidation,
    weight: numberValidation,
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
      heroImages: [],
      superpowers: [],
      catch_phrases: [],
    },
    validationSchema: heroSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      addHeroData(
        values,
        superpowers,
        catchPhrases,
        heroImages,
        updateHero,
        selectedHero?.id,
      );

      // setSubmitting(false);
      // resetForm();
      // onHide();
    },
  });
  const isValid = heroSchema.isValidSync(formik.values);

  console.log(isValid);

  console.log(formik.values);

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
          {/* alignment  */}
          <div className="d-flex  align-items center flex-wrap">
            <Dropdown className="m-2">
              <Dropdown.Toggle variant="danger">
                {' '}
                {formik.values.alignment || 'Hero alignment'}{' '}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '190px', overflow: 'auto' }}>
                {alignmentTypes.map((type, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      formik.setFieldValue('alignment', type);
                    }}
                  >
                    {type}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {/* sex  */}
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle variant="danger">
                {formik.values.sex || 'Hero sex'}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '190px', overflow: 'auto' }}>
                {sexTypes.map((type, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      formik.setFieldValue('sex', type);
                    }}
                  >
                    {type}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* nickname */}
          <InputGroup
            hasValidation
            className="mt-3"
            style={{ minHeight: '63px' }}
          >
            <InputGroup.Text
              className={css.inputLable}
              style={{ height: '38px' }}
            >
              Add Hero nickname
            </InputGroup.Text>
            <Form.Control
              style={{ height: '38px' }}
              type="text"
              name="nickname"
              value={formik.values.nickname}
              isInvalid={formik.values.nickname && formik.errors.nickname}
              onChange={formik.handleChange}
              placeholder="Add Hero`s nickname"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nickname}
            </Form.Control.Feedback>
          </InputGroup>
          {/* real_name  */}
          <InputGroup
            hasValidation
            className="mt-3"
            style={{ minHeight: '63px' }}
          >
            <InputGroup.Text
              className={css.inputLable}
              style={{ height: '38px' }}
            >
              Add Hero real name
            </InputGroup.Text>
            <Form.Control
              style={{ height: '38px' }}
              type="text"
              name="real_name"
              value={formik.values.real_name}
              isInvalid={formik.values.real_name && formik.errors.real_name}
              onChange={formik.handleChange}
              placeholder="Add Hero`s real name"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.real_name}
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup
            hasValidation
            className="mt-3"
            style={{ minHeight: '63px' }}
          >
            <InputGroup.Text
              className={css.inputLable}
              style={{ height: '38px' }}
            >
              Add Hero species
            </InputGroup.Text>
            <Form.Control
              style={{ height: '38px' }}
              type="text"
              name="species"
              value={formik.values.species}
              isInvalid={formik.values.species && formik.errors.species}
              onChange={formik.handleChange}
              placeholder="Add Hero`s species"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.species}
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup
            hasValidation
            className="mt-3"
            style={{ minHeight: '63px' }}
          >
            <InputGroup.Text
              className={css.inputLable}
              style={{ height: '38px' }}
            >
              Add hero weight
            </InputGroup.Text>
            <Form.Control
              style={{ height: '38px' }}
              type="number"
              name="weight"
              isInvalid={formik.values.weight && formik.errors.weight}
              value={formik.values.weight}
              onWheel={event => {
                event.target.blur();
              }}
              onChange={formik.handleChange}
              placeholder="Add Hero`s weight (in kg.)"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.weight}
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup
            hasValidation
            className="mt-3"
            style={{ minHeight: '63px' }}
          >
            <InputGroup.Text
              className={css.inputLable}
              style={{ height: '38px' }}
            >
              Add hero height
            </InputGroup.Text>
            <Form.Control
              style={{ height: '38px' }}
              type="number"
              name="height"
              isInvalid={formik.values.height && formik.errors.height}
              value={formik.values.height}
              onWheel={event => {
                event.target.blur();
              }}
              onChange={formik.handleChange}
              placeholder="Add Hero`s height (in meters)"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.height}
            </Form.Control.Feedback>
          </InputGroup>
          {/* IMAGE MAIN  */}
          <InputGroup
            hasValidation
            className="mt-3"
            style={{ minHeight: '63px' }}
          >
            <InputGroup.Text
              className={css.inputLable}
              style={{ height: '38px' }}
            >
              Add Hero main image
            </InputGroup.Text>
            <Form.Control
              style={{ height: '38px' }}
              type="file"
              isInvalid={formik.values.mainImg && formik.errors.mainImg}
              onChange={e => {
                selectFile(e);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.mainImg}
            </Form.Control.Feedback>
          </InputGroup>

          {/* AGE  */}
          <InputGroup
            hasValidation
            className="mt-3"
            style={{ minHeight: '63px' }}
          >
            <InputGroup.Text
              className={css.inputLable}
              style={{ height: '38px' }}
            >
              Add Hero age
            </InputGroup.Text>
            <Form.Control
              style={{ height: '38px' }}
              type="number"
              inputMode="decimal"
              name="age"
              step="any"
              isInvalid={formik.values.age && formik.errors.age}
              value={formik.values.age}
              onWheel={event => {
                event.target.blur();
              }}
              onChange={formik.handleChange}
              placeholder="Add Hero`s age (in years)"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.age}
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup
            hasValidation
            className="mt-3"
            style={{ minHeight: '63px' }}
          >
            <InputGroup.Text className={css.inputLable}>
              Add Hero origin
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              name="origin_description"
              value={formik.values.origin_description}
              isInvalid={
                formik.values.origin_description &&
                formik.errors.origin_description
              }
              onChange={formik.handleChange}
              placeholder="Add Hero`s origin_description"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.origin_description}
            </Form.Control.Feedback>
          </InputGroup>
          {/* Side Images  */}
          <hr className="my-2" />
          <Button variant="outline-warning" onClick={addImage}>
            Add more images +
          </Button>
          <ul>
            {heroImages.map(i => (
              <Row key={i?.id} as="li">
                <Col
                  md={6}
                  className="d-flex align-items-center justify-content-center mb-2"
                >
                  <Image
                    width={30}
                    src={
                      i.fileName
                        ? process.env.REACT_APP_API_URL + '/' + i.fileName
                        : heroDefultImg
                    }
                    style={{
                      marginRight: '10px',
                      maxHeight: '50px',
                      objectFit: 'contain',
                    }}
                  />
                  <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={e =>
                      changeImages('heroImage', e.target.files[0], i.id)
                    }
                  />
                </Col>
                <Col md={4}>
                  <Button
                    className="mt-3"
                    variant="outline-danger"
                    onClick={() => removeImage(i.id)}
                  >
                    Видалити
                  </Button>
                </Col>
              </Row>
            ))}
          </ul>
          {/* superpowers  */}
          <hr className="my-2" />
          <Button
            variant="outline-warning"
            onClick={() => addInfo(setSuperpowers, superpowers, 'superpowers')}
          >
            Add Hero`s superpowers +
          </Button>
          <ul>
            {superpowers.map(i => (
              <Row key={i.id} as="li">
                <Col md={4}>
                  <Form.Control
                    className="mt-3"
                    type="text"
                    value={i.title}
                    onChange={e =>
                      changeInfo(
                        'title',
                        e.target.value,
                        i.id,
                        setSuperpowers,
                        superpowers,
                      )
                    }
                    placeholder="Add hero superpower"
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    className="mt-3"
                    type="text"
                    value={i.description}
                    onChange={e =>
                      changeInfo(
                        'description',
                        e.target.value,
                        i.id,
                        setSuperpowers,
                        superpowers,
                      )
                    }
                    placeholder="Add description"
                  />
                </Col>
                <Col md={4}>
                  <Button
                    className="mt-3"
                    variant="outline-danger"
                    onClick={() =>
                      removeInfo(
                        i.id,
                        setSuperpowers,
                        superpowers,
                        'superpowers',
                      )
                    }
                  >
                    Видалити
                  </Button>
                </Col>
              </Row>
            ))}
          </ul>
          <hr className="my-2" />
          <Button
            variant="outline-warning"
            onClick={() =>
              addInfo(setCatchPhrases, catchPhrases, 'catch_phrases')
            }
          >
            Add Hero`s catch phrases +
          </Button>
          <ul>
            {catchPhrases.map(i => (
              <Row key={i.id} as="li">
                <Col md={4}>
                  <Form.Control
                    className="mt-3"
                    type="text"
                    value={i.title}
                    onChange={e =>
                      changeInfo(
                        'title',
                        e.target.value,
                        i.id,
                        setCatchPhrases,
                        catchPhrases,
                      )
                    }
                    placeholder="Who said that?"
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    className="mt-3"
                    type="text"
                    value={i.description}
                    onChange={e =>
                      changeInfo(
                        'description',
                        e.target.value,
                        i.id,
                        setCatchPhrases,
                        catchPhrases,
                      )
                    }
                    placeholder="Add phrase"
                  />
                </Col>
                <Col md={4}>
                  <Button
                    className="mt-3"
                    variant="outline-danger"
                    onClick={() =>
                      removeInfo(
                        i.id,
                        setCatchPhrases,
                        catchPhrases,
                        'catch_phrases',
                      )
                    }
                  >
                    Видалити
                  </Button>
                </Col>
              </Row>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer className={css.modalBackground}>
          <Button
            variant="danger"
            onClick={() => {
              onHide();
              formik.resetForm();
            }}
          >
            Cansel
          </Button>
          <Button disabled={!isValid} type="submit" variant="success">
            Edit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditHeroModal;
