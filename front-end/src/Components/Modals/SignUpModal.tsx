import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './Modal.module.scss';
import { UserActions } from '../../Store/user/actions';
import { ModalActions } from '../../Store/modals/actions';
import { InputErrorType, ModalsType } from '../../types';
import Input from '../UI/Input';
import Button from '../UI/Button';
import {
  emailSchema,
  emailTooltip,
  passSchema,
  passTooltip,
  passWithRepeatSchema,
  phoneSchema,
} from '../../Helpers/Validators/User';
import PhoneInput from '../PhoneInput';

function SignUpModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passRepeat, setPassRepeat] = useState('');
  const [phone, setPhone] = useState('');

  const [emailError, setEmailError] = useState<InputErrorType | string>(InputErrorType.error);
  const [passError, setPassError] = useState<InputErrorType | string>(InputErrorType.error);
  const [passRepeatError, setPassRepeatError] = useState<InputErrorType | string>(InputErrorType.error);
  const [phoneError, setPhoneError] = useState<InputErrorType | string>(InputErrorType.error);

  const [emailTimer, setEmailTimer] = useState<any>();
  const [passTimer, setPassTimer] = useState<any>();
  const [passRepeatTimer, setPassRepeatTimer] = useState<any>();
  const [phoneTimer, setPhoneTimer] = useState<any>();

  const onChangeEmailHandler = (val: string) => {
    setEmail(val);
    setEmailError('');
  };
  const onChangePassHandler = (val: string) => {
    setPass(val);
    setPassError('');
  };
  const onChangePassRepeatHandler = (val: string) => {
    setPassRepeat(val);
    setPassRepeatError('');
  };
  const onChangePhoneHandler = (val: string) => {
    setPhone(val);
    setPhoneError('');
  };

  const validateEmail = () => {
    const { error } = emailSchema.validate({ email });
    clearTimeout(emailTimer);
    if (error?.message && email) {
      setEmailTimer(setTimeout(() => setEmailError(error.message), 1000));
    } else if (error?.message && !email) {
      setEmailError(InputErrorType.error);
    } else {
      setEmailError(InputErrorType.success);
      clearTimeout(emailTimer);
    }
  };

  const validatePass = () => {
    const { error } = passSchema.validate({ pass });
    clearTimeout(passTimer);
    if (error?.message && pass) {
      setPassTimer(setTimeout(() => setPassError('Invalid password'), 1000));
    } else if (error?.message && !pass) {
      setPassError(InputErrorType.error);
    } else {
      setPassError(InputErrorType.success);
      clearTimeout(passTimer);
    }
  };
  const validatePassRepeat = () => {
    const { error } = passWithRepeatSchema.validate({ pass, passRepeat });
    clearTimeout(passRepeatTimer);
    if (error?.message && passRepeat) {
      setPassRepeatTimer(setTimeout(() => setPassRepeatError('Not equal passwords'), 1000));
    } else if (error?.message && !passRepeat) {
      setPassRepeatError(InputErrorType.error);
    } else {
      setPassRepeatError(InputErrorType.success);
      clearTimeout(passRepeatTimer);
    }
  };
  const validatePhone = () => {
    const { error } = phoneSchema.validate({ phone });
    clearTimeout(phoneTimer);
    if (error?.message && phone) {
      setPhoneTimer(setTimeout(() => setPhoneError('Phone number must contain 10 digits'), 1000));
    } else if (error?.message && !phone) {
      setPhoneError(InputErrorType.error);
    } else {
      setPhoneError(InputErrorType.success);
      clearTimeout(phoneTimer);
    }
  };

  const allErrorSuccess = (): boolean => emailError === InputErrorType.success
    && passError === InputErrorType.success
    && passRepeatError === InputErrorType.success
    && phoneError === InputErrorType.success;

  const signUp = () => {
    dispatch(UserActions.signUp({
      email, pass, passRepeat, phone: phone.replace(/\D/g, ''),
    }));
  };
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      signUp();
    }
  };
  const goToSignIn = () => {
    dispatch(ModalActions.modalToggle(ModalsType.signInModal));
  };

  useEffect(() => {
    validateEmail();
    return () => clearTimeout(emailTimer);
  }, [email, emailError]);
  useEffect(() => {
    validatePass();
    return () => clearTimeout(passTimer);
  }, [pass, passError]);
  useEffect(() => {
    validatePassRepeat();
    return () => clearTimeout(passRepeatTimer);
  }, [passRepeat, passRepeatError]);
  useEffect(() => {
    validatePhone();
    return () => clearTimeout(phoneTimer);
  }, [phone, phoneError]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Sign up</h1>
      <form className={s.form} onSubmit={signUp} onKeyDown={(e) => handleKeyPress(e)}>
        <div className={s.input}>
          <Input
            label='Email'
            valueDefault={email}
            type='text'
            emitFunc={onChangeEmailHandler}
            error={emailError}
            tooltip={emailTooltip}
          />
        </div>
        <div className={s.input}>
          <Input
            label='Password'
            valueDefault={pass}
            type='password'
            emitFunc={onChangePassHandler}
            error={passError}
            tooltip={passTooltip}
          />
        </div>
        <div className={s.input}>
          <Input
            label='Password repeat'
            valueDefault={passRepeat}
            type='password'
            emitFunc={onChangePassRepeatHandler}
            error={passRepeatError}
            tooltip={!pass || passError !== InputErrorType.success ? 'Fill password field' : 'Repeat password'}
            disable={!pass || passError !== InputErrorType.success}
          />
        </div>
        <div className={s.input}>
          <PhoneInput
            label='Phone number'
            valueDefault={phone}
            emitFunc={onChangePhoneHandler}
            error={phoneError}
            tooltip='Phone number'
          />
        </div>

        <div className={`${s.btn} ${s.twoRows}`}>
          <Button
            label='Sign up!'
            clickFunc={signUp}
            disabled={!allErrorSuccess()}
          />
          <Button label='Go to sign in!' clickFunc={goToSignIn} secondary />
        </div>
      </form>
    </div>
  );
}

export default SignUpModal;
