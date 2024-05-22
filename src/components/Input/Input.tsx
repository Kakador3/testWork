import React, { FC, InputHTMLAttributes } from "react";
import cls from "./Input.module.css";
import { fieldType } from "../../types/types";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputId: number;
  field: fieldType;
  value: string | number;
  setValue: (id: number, field: fieldType, value: string) => void;
}

const Input: FC<Props> = (props) => {
  const { value, inputId, field, setValue, ...otherPoprs } = props;

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (field === "amount") {
      if (!/^\d*[\.,]?\d*$/.test(event.key)) {
        event.preventDefault();
      }
    }
  };

  return (
    <input
      value={value}
      className={cls.input}
      onChange={(event) => setValue(inputId, field, event.target.value)}
      onKeyPress={(event) => onKeyPressHandler(event)}
      {...otherPoprs}
    />
  );
};

export default Input;
