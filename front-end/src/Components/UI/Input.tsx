import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import s from './Input.module.scss';

export interface IInput {
  label: string
  error?: string
  valueDefault?: string
  type?: string
  emitFunc: Function
}
function Input({
  type = 'text', valueDefault, label, emitFunc, error,
}: IInput) {
  const [focus, setFocus] = useState(false);
  const [inputValue, setValue] = useState('');
  const onChangeHandler = ({ target: { value } }:ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    emitFunc(value);
  };
  const labelTextClassNames = classNames({
    [s.labelTextMini]: focus || inputValue,
    [s.labelText]: true,
  });
  const inputClassNames = classNames({
    [s.labelInput]: true,
    [s.error]: error,
  });

  return (
    <label className={s.label}>
      <span className={labelTextClassNames}>{label}</span>
      <input
        type={type}
        defaultValue={valueDefault}
        className={inputClassNames}
        onFocus={() => setFocus(!focus)}
        onBlur={() => setFocus(!focus)}
        onChange={onChangeHandler}
      />
      {error && <span className={s.errorText}>{error}</span>}
    </label>
  );
}

export default Input;
