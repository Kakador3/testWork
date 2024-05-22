import React, { useState } from "react";
import { read, utils } from "xlsx";
import cls from "./Form.module.css";
import { Fields, fieldType, valueFromSheet } from "../../types/types";
import Field from "../Field/Field";
import Counter from "../Counter/Counter";

const Form = () => {
  const [value, setValue] = useState<number>(1);
  const [fields, setFields] = useState<Fields[]>([
    { wallet: "", amount: 0, id: Date.now(), currencyType: "USDT" },
  ]);
  const [dragActive, setDragActive] = React.useState(false);

  const addFields = () => {
    setFields([
      ...fields,
      { wallet: "", amount: 0, id: Date.now(), currencyType: "USDT" },
    ]);
  };

  const deleteFields = (id: number) => {
    setFields(fields.filter((el) => el.id !== id));
  };

  const hadlerFieldUpdate = (id: number, field: fieldType, value: string) => {
    setFields(
      fields.map((el) =>
        el.id === id
          ? {
              ...el,
              [field]: value,
            }
          : el
      )
    );
  };

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (!event.dataTransfer.files) {
      return;
    }
    let reader = new FileReader();

    reader.onload = function (e) {
      const bstr = e?.target?.result;
      const wb = read(bstr, { type: "binary" });

      const wsname = wb.SheetNames[0];
      const worksheet = wb.Sheets[wsname];

      const data = utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
      });
      const temp: valueFromSheet = JSON.parse(JSON.stringify(data)).slice(2);

      const values: Fields[] = [];

      for (let i = 0; i < temp.length; i++) {
        values.push({
          id: Date.now() + i,
          wallet: temp[i][0],
          amount: temp[i][1],
          currencyType: temp[i][2] || "USDT",
        });
      }

      setFields([...fields, ...values]);
      setDragActive(false);
      setValue((prev) => prev + 1);
    };

    reader.readAsBinaryString(event.dataTransfer.files[0]);
  };

  return (
    <div
      id="form-file-upload"
      className={cls.form_file_upload}
      onDragEnter={handleDrag}
    >
      <input
        type="file"
        id="input-file-upload"
        key={value}
        className={cls.input_file_upload}
      />
      <label
        htmlFor="input-file-upload"
        onClick={(event) => event.preventDefault()}
        className={[
          cls.label_file_upload,
          dragActive ? cls.drag_active : "",
        ].join(" ")}
      >
        {fields.map((el, index) => (
          <Field
            key={el.id}
            element={el}
            setValue={hadlerFieldUpdate}
            deleteFields={deleteFields}
            index={index}
          />
        ))}

        <button className={cls.button} onClick={addFields}>
          Add new wallet
        </button>

        <Counter fields={fields} />
      </label>

      {dragActive && (
        <div
          className={cls.drag_file_element}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </div>
  );
};

export default Form;
