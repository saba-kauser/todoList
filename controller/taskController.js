const { getDb } = require("../dbConnect/dbConnect");
const Task = require("../documentStructure/task");

class TaskController {
  
  // Gets the id from the collection and returns it 
  static async checkTaskExist(id) {
    const db = getDb(); 
    const task = await db.collection("tasks").findOne({ _id: id }); //finds the task with the id in the collection
    return !!task;
  }

  // checks if id exists and throws an error if a task does not exist.
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
    await db.collection("tasks").insertOne(newTask); //inserts a new document in the task collection
    return newTask;
  }

  //lists all tasks
  static async getTasks() {
    const db = getDb(); //gets the db
    const tasks = await db.collection("tasks").find().toArray(); //gets all the tasks from the collection
    return tasks;
  }

  //get a single task
  static async getTaskByID(id) {
    const db = getDb();
    const task= await db.collection("tasks").findOne({ _id: id }); //finds the document in the task collection with the id
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  // update tasks all tasks
  static async updateTask(id, name, dueDate) {
    await this.throwErrorIfTaskNotExist(id); //checking if id exists
    const db = getDb(); //gets db 
    const taskInDB = await db.collection("tasks").findOne({ _id: id }); //finds the document with same id as the one passed in api
    const updatedTask = new Task(
      name,
      taskInDB.status,
      dueDate,
      taskInDB.startDate
    );      //calls the task constructor to pass the data 
    await db
      .collection("tasks")
      .updateOne({ _id: id }, { $set: { name, dueDate } }); //inside the collection updates the passed data with the document that matches the id
    return updatedTask;
  }

  //deletes task
  static async deleteTask(id) {
    await this.throwErrorIfTaskNotExist(id);
    const db = getDb();
    await db.collection("tasks").deleteOne({ _id: id }); //deletes the document from the collection
  }

  //mark tasks as todo / done
  static async MarkTaskTodoDone(id) {
    const db = getDb();
    const taskExist = await db.collection("tasks").findOne({ _id: id }); //finds the document with id
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
    await db.collection("tasks").updateOne({ _id: id }, { $set: set }); //updates the task with data
  }

  //filter tasks by status
  static async filterTasksByStatus(status) {
    const db = getDb();
    const tasks = await db
      .collection("tasks")
      .find({ status: { $regex: status } })
      .toArray();
    return tasks;  //filter using reqex in the collection and returns the match
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
      //compares the string to the fields
      sortDate !== "startDate" &&
      sortDate !== "dueDate" &&
      sortDate !== "doneDate"
    ) {
      throw new Error("Invalid sort date");
    }
    const db = getDb();
    const sort = {}; 
    sort[sortDate] = 1; //stores the value of the sortDate that has been passed
    let tasks = []; // an empty array
    //checks if the sort Date is done Date , sorts them and returns 
    if (sortDate === "doneDate") {
      tasks = await db
        .collection("tasks")
        .find({
          $and: [{ doneDate: { $ne: null } }, { doneDate: { $exists: true } }],
        })
        .sort(sort)
        .toArray();
    } else {
      tasks = await db.collection("tasks").find().sort(sort).toArray(); //else returns the tasks with sorted documents from the collection
    }
    return tasks;
  }
}

module.exports = TaskController;
