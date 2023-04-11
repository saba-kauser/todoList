const { ObjectId } = require("mongodb");
const { getDb } = require("../dbConnect/dbConnect");
const Project = require("../documentStructure/project");

//projectcontroller class
class ProjectController {
  //check if project exists
  static async checkProjectExist(id) {
    const db = getDb();
    const project = await db.collection("projects").findOne({ _id: id });
    return !!project;
  }

  //throw error if project does not exist
  static async throwErrorIfProjectNotExist(id) {
    const projectExist = await this.checkProjectExist(id);
    if (!projectExist) {
      throw new Error("Project not found");
    }
  }

  //create a project
  static async createProject(name, startDate, dueDate) {
    const db = getDb();
    const newProject = new Project(name, startDate, dueDate);
    await db.collection("projects").insertOne(newProject);
    return newProject;
  }

  //get list of projects
  static async getProjects() {
    const db = getDb();
    const projects = await db.collection("projects").find().toArray();
    return projects;
  }

  //update project
  static async updateProject(id, name, startDate, dueDate) {
    await this.throwErrorIfProjectNotExist(id);
    const db = getDb();
    const updatedProject = new Project(name, startDate, dueDate);
    await db
      .collection("projects")
      .updateOne({ _id: id }, { $set: updatedProject });
    return updatedProject;
  }

  //delete project
  static async deleteProject(id) {
    await this.throwErrorIfProjectNotExist(id);
    const db = getDb();
    await db.collection("projects").deleteOne({ _id: id });
  }
}

module.exports = ProjectController;
