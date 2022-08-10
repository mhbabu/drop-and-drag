import React, { useState } from "react";
import Joi from "joi-browser";
import { saveTask } from "../services/taskService";

export default function BoardArea() {
  
  const initialData = { name: "" };
  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});

  const dataSchema = {
    name: Joi.string().min(3).max(255).required().label("Name"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formData, dataSchema, options);
    const errors = {};
    if (!error) return null;
    for (let item of error.details) errors[item.path[0]] = item.message;

    setFormErrors(errors);
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: dataSchema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setFormErrors(errors || {});
    if (errors) return;

    await saveTask(formData);
  };

  return (
    <div className="card">
      <div className="card-body mt-5">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="col-md-4 mx-auto">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData["name"]}
                  className="form-control"
                  placeholder="Enter task name"
                  onChange={handleOnChange}
                />
                {formErrors["name"] && (
                  <div className="alert alert-danger">{formErrors["name"]}</div>
                )}
                <button type="submit" className="btn btn-primary ml-2 pointer">
                  Add
                </button>
              </div>
            </div>
          </form>
          <div className="col-md-12 mt-5">
            <div className="board-area">
              <div className="column">
                <h1>To Do</h1>
                <div className="item">Wash Clothes</div>
                <div className="item">Meeting at 9AM</div>
                <div className="item">Fix workshop</div>
                <div className="item">Visit the zoo</div>
              </div>
              <div className="column">
                <h1>In progress</h1>
              </div>
              <div className="column">
                <h1>Completed</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
