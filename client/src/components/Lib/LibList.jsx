import React from 'react';
import css from './Lib.module.css';
import LibListItem from './LibListItem';

const LibList = ({ loading, list }) => {
  return (
    <>
      {loading ? (
        <ul className={css.libList}>
          {Array.from({ length: 5 }, (_, index) => (
            <LibListItem loading={loading} key={index} />
          ))}
        </ul>
      ) : list && list.length > 0 ? (
        <ul className={css.libList}>
          {list.map((item, index) => (
            <LibListItem loading={loading} hero={item} key={index} />
          ))}
        </ul>
      ) : (
        <h1 className={css.noHeroesTitle}>There are no heroes added... yet.</h1>
      )}
    </>
  );
};

export default LibList;
