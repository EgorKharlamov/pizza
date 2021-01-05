import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Components/UI/Button';
import Input from '../Components/UI/Input';
import { UserActions } from '../Store/user/actions';

function Order() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const clickHandler = () => {
    dispatch(UserActions.signIn({ email, pass }));
  };
  const onChangeEmailHandler = (val: string) => {
    setEmail(val);
  };
  const onChangePassHandler = (val: string) => {
    setPass(val);
  };
  return (
    <div className='wrapper'>
      <div className='page'>
        <Button label='Cancel' clickFunc={clickHandler} secondary />
        <Button label='Save' clickFunc={clickHandler} />
        <Input label='Username' emitFunc={onChangeEmailHandler} />
        <Input label='Password' type='password' emitFunc={onChangePassHandler} />
      </div>
    </div>
  );
}

export default Order;
