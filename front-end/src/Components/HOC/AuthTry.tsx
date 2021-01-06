import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { UserActions } from '../../Store/user/actions';

interface AuxProps {
  children: React.ReactNode;
}

const AuthTry = ({ children }: AuxProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cookie = new Cookies();
    const token = cookie.get('auth');
    token && dispatch(UserActions.getUser(token));
  }, []);

  return (
    <>
      { children }
    </>
  );
};

export default AuthTry;
