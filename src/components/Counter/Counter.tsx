import React, { FC, useMemo, useState } from "react";
import cls from "./Counter.module.css";
import { Fields } from "../../types/types";
import { numberParser } from "../../utils/numberParser";

interface Props {
  fields: Fields[];
}

const Counter: FC<Props> = (props) => {
  const { fields } = props;
  const [count, setCount] = useState(0);

  useMemo(() => {
    let value: number = 0;
    fields.forEach((el) => {
      value = value + numberParser(el.amount);
    });

    setCount(value);
  }, [fields]);

  return (
    <div className={cls.container}>
      <div>Receive amount</div>
      <div className={cls.count}>{count.toFixed(2)} USDT</div>
    </div>
  );
};

export default Counter;
