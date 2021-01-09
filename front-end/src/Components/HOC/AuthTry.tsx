import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../Store/user/actions';
import { getAuth } from '../../Helpers/LocalStorage/LocalStorage';

interface AuxProps {
  children: React.ReactNode;
}

const AuthTry = ({ children }: AuxProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAuth();
    token && dispatch(UserActions.getUser(token));
  }, []);

  return (
    <>
      { children }
    </>
  );
};

export default AuthTry;
