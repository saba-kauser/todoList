# todoList

Create endpoints for a to-do list API management: create, edit, delete, list, mark as to-do/done, filter by status, sort by dates
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

# To Get started , open the project in vscode and install NPM dependencies
   npm install 
   
# Start the server using nodemon
  npm start
  
# download install and set up mongodb on your local machine
1.create todoList database 
2.create collection called tasks inside the todoList database
  
# change the url string to your own database url in the project 
  const localurl = "mongodb://localhost:27017";
   
# change the name of the database in index.js file
  connectDb("your database name")
  
  