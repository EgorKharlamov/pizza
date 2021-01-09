import React, { useState } from 'react';
import classNames from 'classnames';
import s from './Input.module.scss';

export interface ITextArea {
  label: string
  valueDefault?: string
  emitFunc: Function
  tooltip?: string
}

function Textarea({
  valueDefault, label, emitFunc, tooltip,
}: ITextArea) {
  const [focus, setFocus] = useState(false);
  const labelTextClassNames = classNames({
    [s.labelTextMini]: focus || valueDefault,
    [s.labelText]: true,
  });
  return (
    <label className={s.label}>
      <span className={labelTextClassNames}>{label}</span>
      <textarea
        rows={5}
        value={valueDefault}
        className={s.labelInput}
        onFocus={() => setFocus(!focus)}
        onChange={(e) => emitFunc(e.target.value)}
        onBlur={() => setFocus(false)}
      />
      {!!tooltip && <span className={s.tooltip}>{tooltip}</span>}
    </label>
  );
}

export default Textarea;
