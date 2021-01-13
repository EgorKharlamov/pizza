import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './Modal.module.scss';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { ModalActions } from '../../Store/modals/actions';
import { InputErrorType, ModalsType } from '../../types';
import { UserActions } from '../../Store/user/actions';
import { emailSchema, passSchema } from '../../Helpers/Validators/User';

function SignInModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [emailError, setEmailError] = useState<InputErrorType | string>(InputErrorType.error);
  const [passError, setPassError] = useState<InputErrorType | string>(InputErrorType.error);

  const [emailTimer, setEmailTimer] = useState<any>();
  const [passTimer, setPassTimer] = useState<any>();

  const signIn = () => {
    dispatch(UserActions.signIn({ email, pass }));
  };
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      signIn();
    }
  };
  const goToSignUp = () => {
    dispatch(ModalActions.modalToggle(ModalsType.signUpModal));
  };

  const onChangeEmailHandler = (val: string) => {
    setEmail(val);
    setEmailError('');
  };
  const onChangePassHandler = (val: string) => {
    setPass(val);
    setPassError('');
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

  useEffect(() => {
    validateEmail();
    return () => clearTimeout(emailTimer);
  }, [email, emailError]);
  useEffect(() => {
    validatePass();
    return () => clearTimeout(passTimer);
  }, [pass, passError]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Sign in</h1>
      <form className={s.form} onSubmit={signIn} onKeyDown={(e) => handleKeyPress(e)}>
        <div className={s.input}>
          <Input
            label='Email'
            valueDefault={email}
            type='text'
            emitFunc={onChangeEmailHandler}
            error={emailError}
            tooltip='Your email'
          />
        </div>

        <div className={s.input}>
          <Input
            label='Password'
            valueDefault={pass}
            type='password'
            emitFunc={onChangePassHandler}
            error={passError}
            tooltip='Your password'
          />
        </div>
        <div className={`${s.btn} ${s.twoRows}`}>
          <Button
            label='Sign in!'
            clickFunc={signIn}
            disabled={!(passError === InputErrorType.success
              && emailError === InputErrorType.success)}
          />
          <Button label='Go to sign up!' clickFunc={goToSignUp} secondary />
        </div>
      </form>
    </div>
  );
}

export default SignInModal;
