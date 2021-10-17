const express = require ( "express" );

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express(); 
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true})); 

// a common localhost test port
const port = 3000; 

var userObj = {
    "loginuser": "username",
    "loginpass": "password",
  };

//http://localhost:3000/
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html", (err)=> {
        if (err){
            console.log(err);
            return;
        }
    });
});

//http://localhost:3000/todo
app.get("/todo", (req, res) => {
    res.sendFile(__dirname + "/public/to_do_list.html", (err)=> {
        if (err){
            console.log(err);
            return;
        }
    });
});

app.post("/todo", (req, res) => {
    if(JSON.stringify(req.body)  == JSON.stringify(userObj))
    {
        console.log("login success, sending to todo page");
        res.redirect("/todo")
    }
    else
    {
        console.log("user failed login, sending back to index")
        res.redirect("/")
    }
});

app.listen (port, () => {
    console.log (`Server is running on http://localhost:${port}`);
});
