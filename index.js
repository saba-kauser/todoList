const express = require("express");
const { connectDb } = require("./dbConnect/dbConnect");

const app = express();
const PORT = 6000; //localhost PORT to listen

connectDb("todoList"); //connect to loalDatabase 

app.use(express.json()); 

const tasksRouter = require("./routes/taskRoutes"); //routes for tasks

const projectRouter = require("./routes/projectRoutes"); //routes for projects


app.use("/tasks", tasksRouter); //path for tasks with the routes

app.use("/projects", projectRouter); //path for projects with routes


// Start the server
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
