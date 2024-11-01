import React, { startTransition, useEffect, useState } from 'react';
import Pages from '../UI/pagination/Pagination';
import css from './Lib.module.css';
import LibList from './LibList';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, fetchHeroes } from '../../redux/heroSlice';

const Lib = () => {
  const [list, setList] = useState({});
  const dispatch = useDispatch();
  const { loading, currentPage } = useSelector(state => state.heroes);

  useEffect(() => {
    dispatch(fetchHeroes({ currentPage, limit: 5 }))
      .then(result => {
        if (result.payload) {
          startTransition(() => {
            setList(result.payload);
          });
        }
      })
      .catch(error => {
        console.error('Error fetching heroes:', error);
      });
  }, [dispatch, currentPage]);

  const handlePageChange = page => {
    dispatch(setCurrentPage(page));
  };

  return (
    <main className={css.main}>
      <LibList list={list?.rows} loading={loading} />
      <Pages
        totalPages={list?.totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Lib;
