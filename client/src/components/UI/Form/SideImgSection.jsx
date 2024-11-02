import React from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import heroDefultImg from '../../../assets/other/superhero-svgrepo-com.svg';

const SideImgSection = ({
  heroImages,
  addImage,
  removeImage,
  changeImages,
  text,
}) => {
  return (
    <>
      {/* Side Images  */}
      <hr className="my-2" />
      <Button variant="outline-warning" onClick={addImage}>
        {text}
      </Button>
      <ul>
        {heroImages.map(i => (
          <Row key={i?.id} as="li">
            <Col md={6} className="d-flex align-items-center  mb-2">
              <Image
                width={30}
                src={
                  i.fileName
                    ? process.env.REACT_APP_API_URL + '/' + i.fileName
                    : heroDefultImg
                }
                style={{
                  marginRight: '10px',
                  marginTop: '15px',
                  maxHeight: '50px',
                  objectFit: 'contain',
                }}
              />
              {!i.fileName && (
                <Form.Control
                  className="mt-3"
                  type="file"
                  onChange={e =>
                    changeImages('heroImage', e.target.files[0], i.id)
                  }
                />
              )}
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
    </>
  );
};

export default SideImgSection;
