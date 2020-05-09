import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function TextArea({ name, label, ...rest }) {
  const textAreaRef = useRef(null);

  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <textarea
        ref={textAreaRef}
        id={fieldName}
        defaultValue={defaultValue}
        className={error ? "has-error" : ""}
        {...rest}
      />

      {error && (
        <span className="error" style={{ color: "#f00" }}>
          {error}
        </span>
      )}
    </>
  );
}
