
const express = require("express");
const { ObjectId } = require("mongodb");
const ProjectController = require("../controller/projectController");
const router = express.Router();

//create a project
router.post("/create", async (req, res) => {
  try {
    const { name, startDate, dueDate } = req.body;
    const newProject = await ProjectController.createProject(
      name,
      startDate,
      dueDate
    );
    res.send(newProject);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating project");
  }
});

// get a list of project
router.get("/list", async (req, res) => {
  try {
    const projects = await ProjectController.getProjects();
    res.send(projects);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error getting projects");
  }
});

//update a project 
router.patch("/:id", async (req, res) => {
  try {
    const { name, startDate, dueDate } = req.body;
    const id = new ObjectId(req.params.id);
    const updatedProject = await ProjectController.updateProject(
      id,
      name,
      startDate,
      dueDate
    );
    res.send(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error updating project");
  }
});

//delete project
router.delete("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    await ProjectController.deleteProject(id);
    res.send("Project deleted");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error deleting project");
  }
});


module.exports = router;