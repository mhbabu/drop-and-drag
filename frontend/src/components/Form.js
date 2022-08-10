import React, { useState } from "react";
import Joi from "joi-browser";
import { saveTask } from "../services/taskService";

export default function Form() {
  const initialData = { name: "" };
  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});

  const dataSchema = {
    name: Joi.string().required().min(3).max(255).label("Name"),
  };

  const handleOnChange = ({ currentTarget: input }) => {
    const errors = { ...formErrors };
    const errorMsg = validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];

    const data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
    setFormErrors(errors);
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formData, dataSchema, options);
    const errors = {};
    if (!error) return null;
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: dataSchema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors || {});
    if (errors) return;

    await saveTask(formData);
  };

  return (
    <div className="row">
      <div className="col-md-4 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="form-group d-flex">
            <input
              type="text"
              name="name"
              value={formData["name"]}
              className="form-control"
              placeholder="Enter task name"
              onChange={handleOnChange}
            />
            <button type="submit" className="btn btn-primary ml-2 pointer">
              Add
            </button>
          </div>
          {formErrors["name"] && (
            <div className="alert alert-danger">{formErrors["name"]}</div>
          )}
        </form>
      </div>
    </div>
  );
}
