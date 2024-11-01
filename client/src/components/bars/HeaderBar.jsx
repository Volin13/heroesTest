import React, { useState } from 'react';
import css from './barsStyles.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactComponent as AddIcon } from '../../assets/barImages/add-create-new-plus-svgrepo-com.svg';
import { ReactComponent as EditIcon } from '../../assets/barImages/edit-svgrepo-com.svg';
import { ReactComponent as DeleteIcon } from '../../assets/barImages/delete-1-svgrepo-com.svg';

import { LIB_ROUTE } from '../../utils/constants';
import AddHeroModal from '../modals/AddHero/AddHeroModal';
import DeleteHeroModal from '../modals/DeleteHero/DeleteHeroModal';
import EditHeroModal from '../modals/EditHero/EditHeroModal';

const HeaderBar = () => {
  const [addHeroModalVisible, setAddHeroModalVisible] = useState(false);
  const [editHeroModalVisible, setEditHeroModalVisible] = useState(false);
  const [deleteHeroModalVisible, setDeleteHeroModalVisible] = useState(false);
  const location = useLocation();
  const isHeroRoute = location.pathname.startsWith('/hero/');
  return (
    <>
      <header className={css.header}>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-bottom">Add Hero</Tooltip>}
        >
          <button
            type="button"
            onClick={() => setAddHeroModalVisible(true)}
            className={`${css.headerBtn} ${css.addBtn}`}
          >
            <AddIcon fill="currentColor" />
          </button>
        </OverlayTrigger>
        {isHeroRoute && (
          <>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-bottom">Edit Hero</Tooltip>}
            >
              <button
                type="button"
                onClick={() => setEditHeroModalVisible(true)}
                className={`${css.headerBtn} ${css.editBtn}`}
              >
                <EditIcon fill="currentColor" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-bottom">Delete Hero</Tooltip>}
            >
              <button
                type="button"
                onClick={() => setDeleteHeroModalVisible(true)}
                className={`${css.headerBtn} ${css.deleteBtn}`}
              >
                <DeleteIcon fill="currentColor" />
              </button>
            </OverlayTrigger>
          </>
        )}

        <NavLink className={css.headerLink} to={LIB_ROUTE}>
          My Hero Lib
        </NavLink>
      </header>
      {addHeroModalVisible && (
        <AddHeroModal
          show={addHeroModalVisible}
          onHide={() => setAddHeroModalVisible(false)}
        />
      )}
      {editHeroModalVisible && (
        <EditHeroModal
          show={editHeroModalVisible}
          onHide={() => setEditHeroModalVisible(false)}
        />
      )}
      {deleteHeroModalVisible && (
        <DeleteHeroModal
          show={deleteHeroModalVisible}
          onHide={() => setDeleteHeroModalVisible(false)}
        />
      )}
    </>
  );
};

export default HeaderBar;
