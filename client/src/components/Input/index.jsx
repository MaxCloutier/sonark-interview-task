import cx from "classnames";
import { TextInput } from "grommet";
import React, { useState } from "react";

import style from "./style.module.scss";

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (value) => {
    setValue(value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

const Input = ({
  autoComplete,
  onChange,
  onBlur,
  onKeyUp,
  placeholder,
  required,
  type = "text",
  value,
  children,
  theme,
  label,
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = ({ target: { value } }) => {
    setLocalValue(value);
    onChange(value);
  };

  return (
    <label className={style.fieldWrapper}>
      {label && <span className="inputLabel">{label}</span>}
      <TextInput
        className={cx(style.field, { [style.dark]: theme === "dark" })}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={localValue}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onChange={handleChange}
      />
      {children}
    </label>
  );
};

export default Input;
