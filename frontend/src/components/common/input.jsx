import React from "react";

const Input = ({ label, name, errors, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input className='form-control' id={name} name={name} {...rest} />
      {errors && <div className='alert alert-danger'>{errors}</div>}
    </div>
  );
};

export default Input;
