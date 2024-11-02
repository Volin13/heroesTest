import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../../redux/heroSelectors';

const BtnGroup = ({ confirmText, hendleCloseBtn, isValid }) => {
  const loading = useSelector(selectLoading);

  return (
    <>
      <Button
        variant="danger"
        onClick={() => {
          hendleCloseBtn();
        }}
      >
        Cansel
      </Button>
      <Button disabled={!isValid && loading} type="submit" variant="success">
        {confirmText}
      </Button>
    </>
  );
};

export default BtnGroup;
