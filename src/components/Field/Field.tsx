import React, { FC } from "react";
import Input from "../Input/Input";
import cls from "./Field.module.css";
import { Fields, fieldType } from "../../types/types";

interface Props {
  index: number;
  element: Fields;
  setValue: (id: number, field: fieldType, value: string) => void;
  deleteFields: (id: number) => void;
}

const Field: FC<Props> = (props) => {
  const { element, deleteFields, setValue, index } = props;

  return (
    <div className={cls.container}>
      <Input
        placeholder="wallet address"
        field="wallet"
        inputId={element.id}
        value={element.wallet}
        setValue={setValue}
      />
      <Input
        placeholder="amount"
        field="amount"
        inputId={element.id}
        value={element.amount}
        setValue={setValue}
      />

      <div className={cls.currencyType}>{element.currencyType}</div>
      {index > 0 && (
        <button className={cls.button} onClick={() => deleteFields(element.id)}>
          Remove
        </button>
      )}
    </div>
  );
};

export default Field;
