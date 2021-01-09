import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IState } from '../../Store';
import { IUserState } from '../../Store/user/types';

interface AuxProps {
  children: React.ReactNode;
}

const AuthProtect = ({ children }: AuxProps) => {
  const user = useSelector<IState, IUserState>((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user.id === -1) {
      history.push('/');
    }
  }, []);

  return (
    <>
      { children }
    </>
  );
};

export default AuthProtect;
