import React, { startTransition, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Tab, Tabs } from 'react-bootstrap';

import { fetchHeroById, setSelectedHero } from '../../redux/heroSlice';
import HeroPictures from './HeroPicrues';
import css from './Hero.module.css';

const Hero = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedHero, loading } = useSelector(state => state.heroes);
  const [heroInfo, setHeroInfo] = useState(selectedHero);
  useEffect(() => {
    if (id) {
      dispatch(fetchHeroById(id)).then(result => {
        if (result.payload) {
          setHeroInfo(result.payload);
          dispatch(setSelectedHero(result.payload));
        }
      });
    }
  }, [dispatch, id]);
  useEffect(() => {
    startTransition(() => {
      setHeroInfo(selectedHero);
    });
  }, [selectedHero, id]);

  return (
    <div className={css.hero}>
      <h1 className={css.heroNickname}>{heroInfo?.nickname}</h1>
      <Card bg="light" text="dark">
        {loading || !heroInfo ? (
          <img
            alt="hero placeholder"
            src={'../../assets/other/superhero-svgrepo-com.svg'}
          />
        ) : (
          <img
            className={css.heroImage}
            alt={heroInfo?.nickname}
            height={200}
            src={
              process.env.REACT_APP_API_URL + '/' + heroInfo?.mainImg ||
              '../../assets/other/superhero-svgrepo-com.svg'
            }
          />
        )}
        <Card.Header>Catch phrases:</Card.Header>
        <Card.Body>
          {loading || !heroInfo ? (
            <blockquote className="blockquote mb-0">
              <p className={css.catchPhrase}>Something..something</p>
              <footer className="blockquote-footer">
                <cite title="Source Title">Someone</cite>
              </footer>
            </blockquote>
          ) : (
            <ul className={css.heroCatchPhraseList}>
              {heroInfo?.catch_phrases.map(item => (
                <li key={item.id}>
                  <blockquote className="blockquote mb-0">
                    <p className={css.catchPhrase}>{item.description}</p>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">{item.title}</cite>
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          )}
        </Card.Body>
      </Card>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className={css.heroInfo}
        justify
        fill
      >
        <Tab eventKey="home" title="Common info">
          <div className={css.heroInfoContent}>
            <ul className={css.heroCommonInfo}>
              <li>
                <p style={{ textTransform: 'capitalize' }}>
                  Real name: {heroInfo?.real_name}
                </p>
              </li>
              <li>
                <p style={{ textTransform: 'capitalize' }}>
                  Nick name: {heroInfo?.nickname}
                </p>
              </li>
              <li>Age: {heroInfo?.age}</li>
              <li>Sex: {heroInfo?.sex}</li>
              <li>Height: {heroInfo?.height} cm</li>
              <li>Weight: {heroInfo?.weight} kg</li>
              <li>Species: {heroInfo?.species}</li>
              <li>Alignment: {heroInfo?.alignment}</li>
            </ul>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Origin">
          <div className={css.heroInfoContent}>
            {heroInfo?.origin_description}
          </div>
        </Tab>
        <Tab eventKey="longer-tab" title="Superpowers">
          <div className={css.heroInfoContent}>
            <ul>
              {heroInfo?.hero_superpowers.map(item => (
                <li key={item.id} className={css.superpowers}>
                  <p className={css.superpowersTitle}>{item.title}</p>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Tab>
        <Tab eventKey="Pictures" title="Pictures">
          <div className={css.heroInfoContent}>
            <HeroPictures images={heroInfo?.heroImages} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Hero;
