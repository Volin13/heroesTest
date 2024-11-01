import React from 'react';
import { ReactComponent as HeroIcon } from '../../assets/barImages/delete-1-svgrepo-com.svg';

const Loader = () => {
  return (
    <div className="loader">
      <HeroIcon className="loaderIcon" />
    </div>
  );
};

export default Loader;
