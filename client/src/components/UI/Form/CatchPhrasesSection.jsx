import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const CatchPhrasesSection = ({
  catchPhrases,
  setCatchPhrases,
  changeInfo,
  removeInfo,
  addInfo,
}) => {
  return (
    <>
      <hr className="my-2" />
      <Button
        variant="outline-warning"
        onClick={() => addInfo(setCatchPhrases, catchPhrases, 'catch_phrases')}
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
                Delete
              </Button>
            </Col>
          </Row>
        ))}
      </ul>
    </>
  );
};

export default CatchPhrasesSection;
