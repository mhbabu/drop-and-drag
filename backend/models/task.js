const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 255,
    required: true,
  },
  status: {
    type: String,
    enum: ["To Do", "Progress", "Done"],
    default: "To Do",
  },
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(task) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
  });

  return schema.validate(task);
}

module.exports.Task = Task;
module.exports.taskSchema = taskSchema;
module.exports.validate = validateTask;
