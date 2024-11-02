import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { alignmentTypes, sexTypes } from '../../../utils/constants';

const Dropdowns = ({ formik }) => {
  return (
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
  );
};

export default Dropdowns;
