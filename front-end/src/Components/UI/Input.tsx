import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import s from './Input.module.scss';
import { InputErrorType } from '../../types';

export interface IInput {
  label: string
  error?: InputErrorType | string
  valueDefault?: string
  type?: string
  emitFunc: Function
  validateOnBlur?: Function
  tooltip?: string
}
function Input({
  type = 'text', valueDefault, label, emitFunc, error, validateOnBlur, tooltip,
}: IInput) {
  const [focus, setFocus] = useState(false);

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    emitFunc(e.target.value);
  };
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
      <input
        type={type}
        value={valueDefault}
        className={inputClassNames}
        onFocus={() => setFocus(!focus)}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
      />
      {!!tooltip && <span className={s.tooltip}>{tooltip}</span>}
      {!!error && error !== InputErrorType.success && <span className={s.errorText}>{error}</span>}
    </label>
  );
}

export default Input;
