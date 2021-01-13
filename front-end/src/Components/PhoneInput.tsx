import classNames from 'classnames';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import s from './UI/Input.module.scss';
import { InputErrorType } from '../types';

export interface IInput {
  label: string
  error?: InputErrorType | string
  valueDefault?: string
  type?: string
  emitFunc: Function
  validateOnBlur?: Function
  tooltip?: string
}
function PhoneInput({
  type = 'text', valueDefault, label, emitFunc, error, validateOnBlur, tooltip,
}: IInput) {
  const [focus, setFocus] = useState(false);

  const onBlurHandler = () => {
    setFocus(!focus);
    if (validateOnBlur) validateOnBlur();
  };
  const labelTextClassNames = classNames({
    [s.labelTextMini]: focus || valueDefault,
    [s.labelText]: true,
  });
  const inputClassNames = classNames({
    [s.labelInput]: true,
    [s.error]: error && error !== InputErrorType.success,
  });
  return (
    <label className={s.label}>
      <span className={labelTextClassNames}>{label}</span>
      <InputMask
        mask='+9 (999) 999-99-99'
        name={label}
        value={valueDefault}
        required
        className={inputClassNames}
        onChange={(e) => emitFunc(e.target.value)}
        onBlur={onBlurHandler}
        onFocus={() => setFocus(!focus)}
      />
      {!!tooltip && <span className={s.tooltip}>{tooltip}</span>}
      {!!error && error !== InputErrorType.success && <span className={s.errorText}>{error}</span>}
    </label>
  );
}

export default PhoneInput;
