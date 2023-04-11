# todoList API

Create endpoints for a to-do list API management: create, edit, delete, list, mark as to-do/done, filter by status, sort by dates
#
1. create a new MongoDB database: “todoList”
2. create a new MongoDB collection: tasks
3. define data structure for MongoDB documents in tasks collection (according to requirements below)
4. create endpoints w/ NodeJS and express to:
a. create a task
b. list all tasks
c. edit a task
d. delete a task
e. mark a task as to-do/done
f. filter tasks by status
g. search tasks by name
h. sort tasks by dates
i. start date
ii. due date


Create endpoints for projects management, tasks can now be assigned to a project
#
1. create a new MongoDB collection: projects
2. define data structure for MongoDB documents in projects collection (according to requirements
below)
3. create endpoints w/ NodeJS and express to:
a. create a project
b. list all projects
c. edit a project
d. delete a project

# To Get started , open the project in vscode and install NPM dependencies
   npm install 
   
# Start the server using nodemon
  npm start
  
# download install and set up mongodb on your local machine

1.create todoList database 
2.create collection called tasks in the todoList database
3.create collection called projects in the todoList database
  
# change the url string to your own database url in the project 
  const localurl = "mongodb://localhost:27017";
   
# change the name of the database in index.js file
  connectDb("your database name")
  
# Folder Structure

# routes
  task routes (I have added a additional route that gets a task by ID) and project routes
  contains all the routes to get , post , update , delete , mark as to do / done, get by status , get by name , get by sort date respectively

# controller
Task class contains 
  functions to :
  check if the tasks exists
  throw error if the task does not exist
  create task
  get task list
  update task
  delete task
  mark task as to do / done
  get tasks by status
  get tasks by name
  get tasks by sort date
Project Class contains
functions to :
  check if the tasks exists
  throw error if the task does not exist
  create task
  get task list
  update task
  delete task
  
# document structure
 
 Project and Task files contains functions to validate fields and a constructor functions
 
# dbConnect
  contains functions to local mongodb database using the url string , gets database and closes database connection

# PostMan Collection
  Attached a postman collection json file with APIs to test the data 
  replace the localhost url and respective IDs while testing each API
  
1. the start date has to be earlier than the due date , the date format is MM/DD/YYYY 
2. the paramater for the sorting are - dueDate, sortDate and doneDate 
  


  
