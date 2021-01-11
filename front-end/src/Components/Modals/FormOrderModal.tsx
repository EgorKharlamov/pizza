import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Modal.module.scss';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { OrderActions } from '../../Store/orders/actions';
import { IState } from '../../Store';
import { IOrderState } from '../../Store/orders/types';
import { IUserState } from '../../Store/user/types';
import { InputErrorType } from '../../types';
import { buildingSchema, roomSchema, streetSchema } from '../../Helpers/Validators/Order';
import { emailSchema, phoneSchema } from '../../Helpers/Validators/User';
import PhoneInput from '../PhoneInput';
import Textarea from '../UI/Textarea';

function SignInModal() {
  const dispatch = useDispatch();
  const { cart, list } = useSelector<IState, IOrderState>((state) => state.order);
  const user = useSelector<IState, IUserState>((state) => state.user);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [room, setRoom] = useState('');
  const [comment, setComment] = useState('');

  const [phoneError, setPhoneError] = useState<InputErrorType | string>(InputErrorType.error);
  const [emailError, setEmailError] = useState<InputErrorType | string>(InputErrorType.error);
  const [streetError, setStreetError] = useState<InputErrorType | string>(InputErrorType.error);
  const [buildingError, setBuildingError] = useState<InputErrorType | string>(InputErrorType.error);
  const [roomError, setRoomError] = useState<InputErrorType | string>(InputErrorType.error);

  const [phoneTimer, setPhoneTimer] = useState<any>();
  const [emailTimer, setEmailTimer] = useState<any>();
  const [streetTimer, setStreetTimer] = useState<any>();
  const [buildingTimer, setBuildingTimer] = useState<any>();
  const [roomTimer, setRoomTimer] = useState<any>();

  const onChangePhoneHandler = (val: string) => {
    setPhone(val);
    setPhoneError('');
  };
  const onChangeEmailHandler = (val: string) => {
    setEmail(val);
    setEmailError('');
  };
  const onChangeStreetHandler = (val: string) => {
    setStreet(val);
    setStreetError('');
  };
  const onChangeBuildingHandler = (val: string) => {
    setBuilding(val);
    setBuildingError('');
  };
  const onChangeRoomHandler = (val: string) => {
    setRoom(val);
    setRoomError('');
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
  const validateStreet = () => {
    const { error } = streetSchema.validate({ street });
    clearTimeout(streetTimer);
    if (error?.message && street) {
      setStreetTimer(setTimeout(() => setStreetError(error.message), 1000));
    } else if (error?.message && !street) {
      setStreetError(InputErrorType.error);
    } else {
      setStreetError(InputErrorType.success);
      clearTimeout(streetTimer);
    }
  };
  const validateBuilding = () => {
    const { error } = buildingSchema.validate({ building });
    clearTimeout(buildingTimer);
    if (error?.message && building) {
      setBuildingTimer(setTimeout(() => setBuildingError(error.message), 1000));
    } else if (error?.message && !building) {
      setBuildingError(InputErrorType.error);
    } else {
      setBuildingError(InputErrorType.success);
      clearTimeout(buildingTimer);
    }
  };
  const validateRoom = () => {
    const { error } = roomSchema.validate({ room });
    clearTimeout(roomTimer);
    if (error?.message && room) {
      setRoomTimer(setTimeout(() => setRoomError(error.message), 1000));
    } else if (error?.message && !room) {
      setRoomError(InputErrorType.error);
    } else {
      setRoomError(InputErrorType.success);
      clearTimeout(roomTimer);
    }
  };

  const allErrorSuccess = (): boolean => streetError === InputErrorType.success
  && buildingError === InputErrorType.success
  && roomError === InputErrorType.success
  && phoneError === InputErrorType.success
  && emailError === InputErrorType.success;

  const sendOrder = () => {
    dispatch(OrderActions.sendOrder({
      pizzas: cart.map((el) => el.id),
      address: { street, building, room },
      comment,
      phone: phone.replace(/\D/g, ''),
      email,
    }));
    dispatch(OrderActions.clearGoodsList());
  };
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      sendOrder();
    }
  };
  const fillWithPreviousOrder = () => {
    if (list[0]) {
      const { address } = list[0];
      setStreet(address.street);
      setBuilding(address.building);
      setRoom(address.room);
      setPhone(list[0].phone);
    }
  };

  useEffect(() => {
    validatePhone();
    return () => clearTimeout(phoneTimer);
  }, [phone, phoneError]);
  useEffect(() => {
    validateEmail();
    return () => clearTimeout(emailTimer);
  }, [email, emailError]);
  useEffect(() => {
    validateStreet();
    return () => clearTimeout(streetTimer);
  }, [street, streetError]);
  useEffect(() => {
    validateBuilding();
    return () => clearTimeout(buildingTimer);
  }, [building, buildingError]);
  useEffect(() => {
    validateRoom();
    return () => clearTimeout(roomTimer);
  }, [room, roomError]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Order</h1>
      {user.id !== -1 && !!list.length && (
        <Button label='Fill with previous order' clickFunc={fillWithPreviousOrder} transparent />
      ) }
      <form className={s.form} onSubmit={sendOrder} onKeyDown={(e) => handleKeyPress(e)}>
        <div className={s.input}>
          <PhoneInput
            label='Phone number'
            valueDefault={phone}
            emitFunc={onChangePhoneHandler}
            error={phoneError}
            tooltip='Phone number'
          />
        </div>
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
            label='Street'
            valueDefault={street}
            type='text'
            emitFunc={onChangeStreetHandler}
            error={streetError}
          />
        </div>
        <div className={s.input}>
          <Input
            label='Building'
            valueDefault={building}
            type='text'
            emitFunc={onChangeBuildingHandler}
            error={buildingError}
          />
        </div>
        <div className={s.input}>
          <Input
            label='Room'
            valueDefault={room}
            type='text'
            emitFunc={onChangeRoomHandler}
            error={roomError}
          />
        </div>
        <div className={s.input}>
          <Textarea
            label='Comment (optional)'
            valueDefault={comment}
            emitFunc={setComment}
          />
        </div>
        <div className={s.btn}>
          <Button label='Send' clickFunc={sendOrder} disabled={!allErrorSuccess()} />
        </div>
      </form>
    </div>
  );
}

export default SignInModal;
