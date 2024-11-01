import React from 'react';
import css from './Lib.module.css';
import { Card, Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { HERO_ROUTE } from '../../utils/constants';
import loadingFace from '../../assets/other/superhero-svgrepo-com.svg';

const LibListItem = ({ loading, hero }) => {
  const navigate = useNavigate();
  return (
    <li className={css.libListItem} key={hero?.id}>
      {loading ? (
        <Card className={css.card} bg="dark">
          <div style={{ overflow: 'hidden' }}>
            <Card.Img
              className={`${css.cardImage} ${css.imgPreloader}`}
              variant="top"
              src={loadingFace}
            />
          </div>
          <Card.Body>
            <Card.Title className="d-flex justify-content-around a">
              {' '}
              <Placeholder xs={5} bg="light" />
              {'   '}
              <Placeholder xs={6} bg="light" />
            </Card.Title>
          </Card.Body>
        </Card>
      ) : (
        <Card
          bg="dark"
          className={css.card}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(HERO_ROUTE + '/' + hero.id)}
        >
          <div style={{ overflow: 'hidden' }}>
            <Card.Img
              variant="top"
              className={css.cardImage}
              src={process.env.REACT_APP_API_URL + '/' + hero.mainImageUrl}
            />
          </div>
          <Card.Footer className="p-0">
            <Card.Title className={`"m-0 text-center ${css.cardTitle}`}>
              {hero.nickname}
            </Card.Title>
          </Card.Footer>
        </Card>
      )}
    </li>
  );
};

export default LibListItem;
