const express = require("express");
const { ObjectId } = require("mongodb");
const TaskController = require("../controller/taskController");
const router = express.Router();

//create task
router.post("/create", async (req, res) => {
  try {
    const { name, status, dueDate, startDate } = req.body;
    const newTask = await TaskController.createTask(
      name,
      status,
      dueDate,
      startDate
    );
    res.send(newTask);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating task");
  }
});

//list all tasks
router.get("/list", async (req, res) => {
  try {
    const tasks = await TaskController.getTasks();
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error getting tasks");
  }
});

//update task
router.patch("/:id", async (req, res) => {
  try {
    const { name, dueDate } = req.body;
    const id = new ObjectId(req.params.id);
    const updatedTask = await TaskController.updateTask(id, name, dueDate);
    res.send(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error updating task");
  }
});

//delete a task
router.delete("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    await TaskController.deleteTask(id);
    res.send("Task deleted");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error deleting task");
  }
});

//Mark task as to do or done
router.post("/:id/done", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    await TaskController.MarkTaskTodoDone(id);
    res.send("Task Completed");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error updating task");
  }
});

//get tasks by status
router.get("/status/:status", async (req, res) => {
  try {
    const tasks = await TaskController.filterTasksByStatus(req.params.status);
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error getting tasks by status");
  }
});

//get tasks by name
router.get("/name/:name", async (req, res) => {
  try {
    const tasks = await TaskController.filterTasksByName(req.params.name);
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error getting tasks by name");
  }
});

//sort tasks
router.get("/sort/date/:sortType", async (req, res) => {
  try {
    const tasks = await TaskController.getTasksBySortDate(req.params.sortType);
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error sorting tasks");
  }
});

module.exports = router;
