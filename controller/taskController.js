const { getDb } = require("../dbConnect/dbConnect");
const Task = require("../documentStructure/task");

class TaskController {
  // check if tasks exists by passing id

  static async checkTaskExist(id) {
    const db = getDb();
    const task = await db.collection("tasks").findOne({ _id: id });
    return !!task;
  }

  // throws an error if a task does not exist.
  static async throwErrorIfTaskNotExist(id) {
    const taskExist = await this.checkTaskExist(id);
    if (!taskExist) {
      throw new Error("Task not found");
    }
  }

  // create a task
  static async createTask(name, status, dueDate, startDate) {
    const db = getDb();
    const newTask = new Task(name, status, dueDate, startDate);
    await db.collection("tasks").insertOne(newTask);
    return newTask;
  }

  //lists all tasks
  static async getTasks() {
    const db = getDb();
    const tasks = await db.collection("tasks").find().toArray();
    return tasks;
  }

  // lists all tasks
  static async updateTask(id, name, dueDate) {
    await this.throwErrorIfTaskNotExist(id);
    const db = getDb();
    const taskInDB = await db.collection("tasks").findOne({ _id: id });
    const updatedTask = new Task(
      name,
      taskInDB.status,
      dueDate,
      taskInDB.startDate
    );
    await db
      .collection("tasks")
      .updateOne({ _id: id }, { $set: { name, dueDate } });
    return updatedTask;
  }

  //deletes task
  static async deleteTask(id) {
    await this.throwErrorIfTaskNotExist(id);
    const db = getDb();
    await db.collection("tasks").deleteOne({ _id: id });
  }

  //mark tasks as todo / done
  static async MarkTaskTodoDone(id) {
    const db = getDb();
    const taskExist = await db.collection("tasks").findOne({ _id: id });
    if (!taskExist) {
      throw new Error("Task not found");
    }
    let set = {};
    if (taskExist.status === "done") {
      // If task is done, mark it as to-do, remove done date and set start date to now.
      set = { status: "to-do", doneDate: null, startDate: new Date() };
    } else {
      // Else if task is not done, mark it as done and set done date.
      set = { status: "done", doneDate: new Date() };
    }
    await db.collection("tasks").updateOne({ _id: id }, { $set: set });
  }

  //filter tasks by status
  static async filterTasksByStatus(status) {
    const db = getDb();
    const tasks = await db
      .collection("tasks")
      .find({ status: { $regex: status } })
      .toArray();
    return tasks;
  }

  //get tasks by name
  static async filterTasksByName(name) {
    if (!name || name.length === 0) {
      throw new Error("Name is required");
    }
    const db = getDb();
    const tasks = await db
      .collection("tasks")
      .find({ name: { $regex: name } })
      .toArray();
    return tasks;
  }

  //gets tasks by sortDate
  static async getTasksBySortDate(sortDate) {
    if (
      sortDate !== "startDate" &&
      sortDate !== "dueDate" &&
      sortDate !== "doneDate"
    ) {
      throw new Error("Invalid sort date");
    }
    const db = getDb();
    const sort = {};
    sort[sortDate] = 1;
    let tasks = [];
    if (sortDate === "doneDate") {
      tasks = await db
        .collection("tasks")
        .find({
          $and: [{ doneDate: { $ne: null } }, { doneDate: { $exists: true } }],
        })
        .sort(sort)
        .toArray();
    } else {
      tasks = await db.collection("tasks").find().sort(sort).toArray();
    }
    return tasks;
  }
}

module.exports = TaskController;
