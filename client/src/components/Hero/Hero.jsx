import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Placeholder, Tab, Tabs } from 'react-bootstrap';

import { fetchHeroById, setSelectedHero } from '../../redux/heroSlice';
import HeroPictures from './HeroPicrues';
import HeroPlaceholder from '../../assets/other/superhero-svgrepo-com.svg';
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
    console.log(selectedHero);
    if (selectedHero) {
      setHeroInfo(selectedHero);
    }
  }, [selectedHero]);

  return (
    <div className={css.hero}>
      <h1 className={css.heroNickname}>{heroInfo?.nickname}</h1>
      <Card bg="light" text="dark">
        {loading || !heroInfo ? (
          <img
            alt="hero placeholder"
            height={200}
            width={200}
            className={css.heroImage}
            src={HeroPlaceholder}
          />
        ) : (
          <img
            className={css.heroImage}
            alt={heroInfo?.nickname}
            height={200}
            src={process.env.REACT_APP_API_URL + '/' + heroInfo?.mainImg}
          />
        )}
        <Card.Header>Catch phrases:</Card.Header>
        <Card.Body style={{ minHeight: '117px' }}>
          {loading ? (
            <blockquote className="blockquote mb-3">
              <p className={css.catchPhrase}>
                <Placeholder xs={12} />
              </p>
              <footer className="mt-3">
                <cite title="Source Title">Someone</cite>
              </footer>
            </blockquote>
          ) : (
            <ul className={css.heroCatchPhraseList}>
              {heroInfo?.catch_phrases?.map(item => (
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
                  Name: {heroInfo?.real_name}
                </p>
              </li>
              <li>
                <p style={{ textTransform: 'capitalize' }}>
                  Nickname: {heroInfo?.nickname}
                </p>
              </li>
              <li>Age: {heroInfo?.age} years</li>
              <li>Sex: {heroInfo?.sex}</li>
              <li>Height: {heroInfo?.height} m.</li>
              <li>Weight: {heroInfo?.weight} kg</li>
              <li>Species: {heroInfo?.species}</li>
              <li>Alignment: {heroInfo?.alignment}</li>
            </ul>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Origin">
          <div className={css.heroInfoContent}>
            <p
              style={{
                height: '100%',
                width: '100%',
                overflowY: 'auto',
              }}
            >
              {loading ? (
                <>
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                </>
              ) : (
                heroInfo?.origin_description
              )}
            </p>
          </div>
        </Tab>
        <Tab eventKey="longer-tab" title="Superpowers">
          <div className={css.heroInfoContent}>
            <ul>
              {heroInfo?.hero_superpowers?.map(item => (
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
