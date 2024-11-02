import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const SuperpowersSection = ({
  superpowers,
  setSuperpowers,
  changeInfo,
  removeInfo,
  addInfo,
}) => {
  return (
    <>
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
                  removeInfo(i.id, setSuperpowers, superpowers, 'superpowers')
                }
              >
                Delete
              </Button>
            </Col>
          </Row>
        ))}
      </ul>
    </>
  );
};

export default SuperpowersSection;
