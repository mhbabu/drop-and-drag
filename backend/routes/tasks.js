const validateObjectId = require("../middleware/validateObjectId");
const { Task, validate } = require("../models/task");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().select("-__v").sort("-_id");
  res.send(tasks);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task({ title: req.body.title });
  task = await task.save();

  res.send(task);
});

router.put("/:id", [validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );

  if (!task)
    return res.status(404).send("The task with the given ID is not found.");

  res.send(task);
});

router.delete("/:id", [validateObjectId], async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID is not found.");

  res.send(task);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const task = await Task.findById(req.params.id).select("-__v");

  if (!task)
    return res.status(404).send("The task with the given ID is not found.");

  res.send(task);
});

module.exports = router;
