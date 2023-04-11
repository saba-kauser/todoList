class Task {
  //Check if all required fields are on the object.

  validateDefaultFields() {
    if (!this.name || this.name.length === 0) {
      throw new Error("Name is required");
    }
    if (!this.status || this.status.length === 0) {
      throw new Error("Status is required");
    }
    if (!this.dueDate) {
      throw new Error("Due date is required");
    }
    if (!this.startDate) {
      throw new Error("Start date is required");
    }
  }

  //Check if all fields are valid.

  validateFields() {
    if (this.status !== "to-do" && this.status !== "done") {
      throw new Error("Status is invalid");
    }
    if (this.dueDate < this.startDate) {
      throw new Error("Due date is earlier than start date");
    }
    if (this.startDate > this.dueDate) {
      throw new Error("Start date is later than due date");
    }
    if (this.startDate instanceof Date === false) {
      throw new Error("Start date is invalid");
    }
    if (this.dueDate instanceof Date === false) {
      throw new Error("Due date is invalid");
    }
  }

  //constructor function
  constructor(name, status = "to-do", dueDate, startDate) {
    this.name = name;
    this.status = status;
    this.dueDate = dueDate ? new Date(dueDate) : new Date(); //date with passed date else creates date with todays date 
    this.startDate = startDate ? new Date(startDate) : new Date();
    this.validateDefaultFields();
    this.validateFields();
  }
}

module.exports = Task;
