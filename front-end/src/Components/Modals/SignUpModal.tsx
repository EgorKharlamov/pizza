import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './SignUpModal.module.scss';
import { UserActions } from '../../Store/user/actions';
import { ModalActions } from '../../Store/modals/actions';
import { ModalsType } from '../../types';
import Input from '../UI/Input';
import Button from '../UI/Button';

function SignUpModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passRepeat, setPassRepeat] = useState('');
  const [phone, setPhone] = useState('');

  const signUp = () => {
    dispatch(UserActions.signUp({
      email, pass, passRepeat, phone: +phone,
    }));
    setEmail('');
    setPass('');
    setPassRepeat('');
    setPhone('');
  };
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      signUp();
    }
  };

  const goToSignIn = () => {
    dispatch(ModalActions.modalToggle(ModalsType.signInModal));
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Sign up</h1>
      <form className={s.form} onSubmit={signUp} onKeyDown={(e) => handleKeyPress(e)}>
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
        <div className={s.input}>
          <Input
            label='Password repeat'
            valueDefault={passRepeat}
            type='password'
            emitFunc={setPassRepeat}
          />
        </div>
        <div className={s.input}>
          <Input
            label='Phone number'
            valueDefault={phone}
            emitFunc={setPhone}
          />
        </div>
        <div className={s.btn}>
          <Button label='Sign up!' clickFunc={signUp} />
          <Button label='Go to sign in!' clickFunc={goToSignIn} transparent />
        </div>
      </form>
    </div>
  );
}

export default SignUpModal;
