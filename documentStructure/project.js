class Project {
    //check required fields
    checkRequiredFields() {
      if (!this.name || this.name.length === 0) {
        throw new Error("Name is required");
      }
      if (!this.startDate) {
        throw new Error("Start date is required");
      }
      if (!this.dueDate) {
        throw new Error("Due date is required");
      }
    }
  
    //validate fields
    checkValidFelids() {
      if (this.startDate > this.dueDate) {
        throw new Error("Start date is later than due date");
      }
      if (this.dueDate < this.startDate) {
        throw new Error("Due date is earlier than start date");
      }
      if (this.startDate instanceof Date === false) {
        throw new Error("Start date is invalid");
      }
      if (this.dueDate instanceof Date === false) {
        throw new Error("Due date is invalid");
      }
    }
  
    //constructor class
    constructor(name, startDate, dueDate) {
      this.name = name;
      this.startDate = startDate ? new Date(startDate) : new Date();
      this.dueDate = dueDate ? new Date(dueDate) : new Date();
      this.checkRequiredFields();
      this.checkValidFelids();
    }
  }
  
  module.exports = Project;