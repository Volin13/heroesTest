import React from 'react';
import css from './pagination.module.css';
import { Pagination } from 'react-bootstrap';

const Pages = ({ totalPages, onPageChange, currentPage }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      {totalPages > 1 && (
        <Pagination className={`mt-3 justify-content-center ${css.pagination}`}>
          {pages.map(page => (
            <Pagination.Item
              linkClassName={css.paginationLink}
              key={page}
              onClick={() => onPageChange(page)}
              active={page === currentPage}
            >
              {page}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default Pages;
