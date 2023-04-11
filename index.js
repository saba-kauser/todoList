const express = require("express");
const { connectDb } = require("./dbConnect/dbConnect");

const app = express();
const PORT = 6000;

connectDb("todoList");

app.use(express.json());

const tasksRouter = require("./routes/taskRoutes");

const projectRouter = require("./routes/projectRoutes");


app.use("/tasks", tasksRouter);

app.use("/projects", projectRouter);


// Start the server
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
