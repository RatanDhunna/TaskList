import React from "react";

function Input({ classprop, onChange, placeholder, currValue }) {
  return (
    <div>
      <input
        className={classprop}
        onChange={onChange}
        placeholder={placeholder}
        value={currValue}
      />
    </div>
  );
}

export default Input;
