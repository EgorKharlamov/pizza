import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import s from './Dropdown.module.scss';

export type DropdownOption = {
  name: string
  functionToEmit?: Function
}
export interface IDropdown {
  label: string
  icon?: IconDefinition
  options: DropdownOption[]
  isAccount: boolean
}

const Dropdown = (({
  icon, options, label, isAccount,
}: IDropdown) => {
  const [showToggle, setShow] = useState(false);
  const node = useRef<HTMLDivElement>(null!);

  const handleClickOut = (e: any) => {
    if (node?.current?.contains(e.target)) {
      return;
    }
    setShow(false);
  };

  useEffect(() => {
    if (showToggle) {
      document.addEventListener('mousedown', handleClickOut);
    } else {
      document.removeEventListener('mousedown', handleClickOut);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, [showToggle]);

  return (
    <div className={`${s.dropdown}`} ref={node}>
      <button
        className={`${s.dropdownButton} ${s.button}`}
        type='button'
        onClick={() => setShow(!showToggle)}
      >
        <span className={`${s.buttonText} ${isAccount && s.buttonTextHide}`}>{label}</span>
        {icon && <FontAwesomeIcon icon={icon} className={s.buttonIcon} />}
      </button>
      {showToggle && (
        <div className={`${s.dropdownOptions}`}>
          {options.map((option) => (
            <div
              className={`${s.option}`}
              key={option.name}
              onClick={() => (option.functionToEmit ? option.functionToEmit() : '')}
            >
              <p className={s.optionLabel}>
                {option.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
);

export default Dropdown;
