import React from 'react';
import css from '../../modals/modals.module.css';
import { Form, InputGroup } from 'react-bootstrap';

const InputSection = ({ formik, selectFile }) => {
  return (
    <>
      <InputGroup hasValidation className="mt-3" style={{ minHeight: '63px' }}>
        <InputGroup.Text className={css.inputLable} style={{ height: '38px' }}>
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
      <InputGroup hasValidation className="mt-3" style={{ minHeight: '63px' }}>
        <InputGroup.Text className={css.inputLable} style={{ height: '38px' }}>
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
      <InputGroup hasValidation className="mt-3" style={{ minHeight: '63px' }}>
        <InputGroup.Text className={css.inputLable} style={{ height: '38px' }}>
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
      <InputGroup hasValidation className="mt-3" style={{ minHeight: '63px' }}>
        <InputGroup.Text className={css.inputLable} style={{ height: '38px' }}>
          Add hero weight
        </InputGroup.Text>
        <Form.Control
          style={{ height: '38px' }}
          type="number"
          name="weight"
          step="0.01"
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
      <InputGroup hasValidation className="mt-3" style={{ minHeight: '63px' }}>
        <InputGroup.Text className={css.inputLable} style={{ height: '38px' }}>
          Add hero height
        </InputGroup.Text>
        <Form.Control
          style={{ height: '38px' }}
          type="number"
          step="0.01"
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
      <InputGroup hasValidation className="mt-3" style={{ minHeight: '63px' }}>
        <InputGroup.Text className={css.inputLable} style={{ height: '38px' }}>
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
      <InputGroup hasValidation className="mt-3" style={{ minHeight: '63px' }}>
        <InputGroup.Text className={css.inputLable} style={{ height: '38px' }}>
          Add Hero age
        </InputGroup.Text>
        <Form.Control
          style={{ height: '38px' }}
          type="number"
          step="0.01"
          inputMode="decimal"
          name="age"
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
      <InputGroup hasValidation className="mt-3" style={{ minHeight: '63px' }}>
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
            formik.values.origin_description && formik.errors.origin_description
          }
          onChange={formik.handleChange}
          placeholder="Add Hero`s origin_description"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.origin_description}
        </Form.Control.Feedback>
      </InputGroup>
    </>
  );
};

export default InputSection;
