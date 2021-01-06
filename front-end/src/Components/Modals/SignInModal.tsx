import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './SignInModal.module.scss';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { ModalActions } from '../../Store/modals/actions';
import { ModalsType } from '../../types';
import { UserActions } from '../../Store/user/actions';

function SignInModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const signIn = () => {
    dispatch(UserActions.signIn({ email, pass }));
    setEmail('');
    setPass('');
  };
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      signIn();
    }
  };
  const goToSignUp = () => {
    dispatch(ModalActions.modalToggle(ModalsType.signUpModal));
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Sign in</h1>
      <form className={s.form} onSubmit={signIn} onKeyDown={(e) => handleKeyPress(e)}>
        <div className={s.input}>
          <Input
            label='Email'
            valueDefault={email}
            type='text'
            emitFunc={setEmail}
          />
        </div>
        <div className={s.input}>
          <Input
            label='Password'
            valueDefault={pass}
            type='password'
            emitFunc={setPass}
          />
        </div>
        <div className={s.btn}>
          <Button label='Sign in!' clickFunc={signIn} />
          <Button label='Go to sign up!' clickFunc={goToSignUp} transparent />
        </div>
      </form>
    </div>
  );
}

export default SignInModal;
