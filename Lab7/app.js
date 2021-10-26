const express = require ( "express" );

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express(); 
// host static resources
app.use(express.static("public"));
// body-parser is now built into express!
app.use(express.urlencoded({ extended: true})); 

// a common localhost test port
const port = 3000; 
const fs = require( "fs" );
app.set("view engine", "ejs");
// Simple server operation
app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
});


var users = {
    "list": [
      {
        "username": "usera",
        "password": "a"
      },
      {
        "username": "userb",
        "password": "b"
      }
    ] 
  };

var tasks = {
    "list": [
      {
        "_id": 0,
        "text": "task1, index 0",
        "state" : "unclaimed",
        "creator" : "usera",
        "isTaskClaimed" : false,
        "claimingUser" : null,
        "isTaskDone" : false,
        "isTaskCleared" : false,
      },
      {
        "_id": 1,
        "text": "task2, index 1",
        "state" : "claimed by usera, unfinished",
        "creator" : "usera",
        "isTaskClaimed" : true,
        "claimingUser" : "usera",
        "isTaskDone" : false,
        "isTaskCleared" : false,
      },
      {
        "_id": 2,
        "text": "task3 index 2",
        "state" : "claimed by userb, unfinished",
        "creator" : "userb",
        "isTaskClaimed" : true,
        "claimingUser" : "userb",
        "isTaskDone" : false,
        "isTaskCleared" : false,
      },
      {
        "_id": 3,
        "text": "task4 index 3",
        "state" : "claimed by usera, finished",
        "creator" : "usera",
        "isTaskClaimed" : true,
        "claimingUser" : "usera",
        "isTaskDone" : true,
        "isTaskCleared" : false,
      },
      {
        "_id": 4,
        "text": "task5 index 4",
        "state" : "claimed by userb, finished",
        "creator" : "userb",
        "isTaskClaimed" : true,
        "claimingUser" : "userb",
        "isTaskDone" : true,
        "isTaskCleared" : false,
      }
    ] 
  };


function writeTask (){
  fs.writeFileSync ( __dirname + "/tasks.json", 
                     JSON.stringify( tasks ), 
                     "utf8", 
                     ( err ) => {
      if ( err ) {
          console.log( err );
          return;
      }
  } );
}

function updateTask (taskData){
  fs.writeFileSync ( __dirname + "/tasks.json", 
                     JSON.stringify( taskData ), 
                     "utf8", 
                     ( err ) => {
      if ( err ) {
          console.log( err );
          return;
      }
  } );
}

function writeUser(){
  fs.writeFileSync ( __dirname + "/users.json", 
                     JSON.stringify( users ), 
                     "utf8", 
                     ( err ) => {
      if ( err ) {
          console.log( err );
          return;
      }
  } );
}


//writeUser(); //keep this commented for the love of god
//writeTask();

function readTask(){
  try {
    const data = fs.readFileSync(__dirname + "/tasks.json", "utf8");
  
    list = JSON.parse(data.toString())

    return list;

  } catch (err) {
    console.error(err);
  }
};

function readUser(index){
  try {
    const data = fs.readFileSync(__dirname + "/users.json", "utf8");
    list = JSON.parse(data.toString())
    return list;

  } catch (err) {
    console.error(err);
  }
};

//http://localhost:3000

app.get("/", (req, res)=>{
    res.render("login");
});
let fruits = ["apples", "orange", "peach", "mango"];
app.post("/login", (req, res) => {
    let success = false;
    let userList = readUser()["list"];
    for(var i = 0; i <userList.length; i++){
      if(req.body.loginuser == userList[i].username && req.body.loginpass == userList[i].password){
        success = true;
        console.log("successful user login.");
        res.render("todo", {username: req.body.loginuser, tasks: readTask()});
      }
    };
    if(!success){
      console.log("failed user login")
      res.redirect("/")
    }
    
});

app.post("/register", (req, res) => {
    let success = false;
    let unique = true;
    let userList = readUser()["list"];

    for(var i = 0; i <userList.length; i++){
      if(req.body.signupuname == userList[i].username){
        unique = false;
        console.log("username taken.")
        res.redirect("/");
      };
    }

    if(req.body.auth == "todo2021" && req.body.signuppass == req.body.signupcpass && unique){
      success = true;
      users = readUser();
      users["list"].push({"username" : req.body.signupuname, "password" : req.body.signuppass})
      writeUser();
      res.render("todo", { username: req.body.signupuname, tasks: readTask()});
    }
    
    if(!success){
      console.log("failed user login")
      res.redirect("/")
    }
});

app.get("/logout", (req, res) => {
  console.log("logout was pushed")
  res.redirect("/")
});

app.post("/addtask", (req, res) => {
  console.log("addtask was pushed")
  let taskList = readTask();
 
  taskList["list"].push({"_id": taskList["list"].length,
  "text": req.body.addtasktext,
  "state" : "unclaimed",
  "creator" : req.body.username,
  "isTaskClaimed" : false,
  "claimingUser" : req.body.username,
  "isTaskDone" : false,
  "isTaskCleared" : false,})
 
  updateTask(taskList);

  res.render("todo", { username: req.body.username, tasks: readTask()});


});

app.post("/claim", (req, res) => {
  console.log("claim was pushed")
  let taskList = readTask();
 
  taskList["list"][req.body._id].state = "claimed by "+ req.body.username +", unfinished";
  taskList["list"][req.body._id].claimingUser = req.body.username;
  taskList["list"][req.body._id].isTaskClaimed = true;
  updateTask(taskList);

  res.render("todo", { username: req.body.username, tasks: readTask()});
});
app.post("/abandonorcomplete", (req, res) => {
  console.log("abandonorcomplete")
  let taskList = readTask();

  if(req.body.cbox){
    taskList["list"][req.body._id].state = "claimed by "+ req.body.username +", finished";
    taskList["list"][req.body._id].isTaskDone = true;
  }
  else{
    taskList["list"][req.body._id].state = "unclaimed";
    taskList["list"][req.body._id].isTaskClaimed = false;
    taskList["list"][req.body._id].claimingUser = null;
  }

  updateTask(taskList);

  res.render("todo", { username: req.body.username, tasks: readTask()});
});
app.post("/unfinish", (req, res) => {
  console.log("unfinish")
  let taskList = readTask();

  taskList["list"][req.body._id].state = "claimed by "+ req.body.username +", unfinished";
  taskList["list"][req.body._id].isTaskDone = false;
  updateTask(taskList);

  res.render("todo", { username: req.body.username, tasks: readTask()});
});

app.post("/purge", (req, res) => {
  console.log("PURGE")

  let taskList = readTask();
  for (let i = 0; i < taskList["list"].length; i ++){
    if(taskList["list"][i].isTaskDone == true){
      taskList["list"][i].isTaskCleared = true;
    }
  }


 
  updateTask(taskList);

  res.render("todo", { username: req.body.username, tasks: readTask()});
});









// app.get("/todo", (req, res)=>{
//   console.log
//     res.render("todo", {username: "Adam"}); //should eventually pass username and array of tasks
//         //res.render("greeting", {username: "Adam"})
//         //res.redirect('/?user=' + error);
// });






