import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SignInModal from './SignInModal';
import { IModalState } from '../../Store/modals/types';
import { IState } from '../../Store';
import { ModalsType } from '../../types';
import SignUpModal from './SignUpModal';
import s from './AllModalContainer.module.scss';
import { ModalActions } from '../../Store/modals/actions';
import { IUserState } from '../../Store/user/types';

function AllModalContainer() {
  const dispatch = useDispatch();
  const { showed, type } = useSelector<IState, IModalState>((state) => state.modal);

  const user = useSelector<IState, IUserState>((state) => state.user);

  const closeModal = () => {
    dispatch(ModalActions.modalToggle(null));
  };

  const node = useRef<HTMLDivElement>(null!);

  const handleClickOut = (e: any) => {
    if (node?.current?.contains(e.target)) {
      return;
    }
    closeModal();
  };

  useEffect(() => {
    if (showed) {
      document.addEventListener('mousedown', handleClickOut);
    } else {
      document.removeEventListener('mousedown', handleClickOut);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, [showed]);

  useEffect(() => {
    if (user.id > -1 && showed) {
      closeModal();
    }
  }, [user]);

  return (
    <>
      { showed && (
      <div className={s.container}>
        <div className={s.modal} ref={node}>
          <FontAwesomeIcon icon={faTimes} className={`${s.icon} ${s.iconTimes}`} onClick={closeModal} />
          {type === ModalsType.signInModal && <SignInModal />}
          {type === ModalsType.signUpModal && <SignUpModal />}
        </div>
      </div>
      )}
    </>
  );
}

export default AllModalContainer;
