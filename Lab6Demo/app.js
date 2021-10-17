console.log("hello world");

//const fs = require( "fs" );
const calculator = require(__dirname + "/calc.js");
const express = require ( "express" );

const add = calculator.add;

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express(); 
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true})); 


// a common localhost test port
const port = 3000; 

var myObj = {
    "firstName": "Adam",
    "lastName": "Tilson",
    "address": {
      "streetAddress": "123 Fake St.",
      "city": "Springfield"
    },
    "phoneNumbers": [
      {
        "type": "home",
        "number": "123 456-7890"
      },
      {
        "type": "work",
        "number": "789 456-1230"
      }
    ],
    "children": [],
    "spouse": null
  }
  ;

// fs.writeFileSync ( __dirname + "/object.json", 
//                    JSON.stringify( myObj ), 
//                    "utf8", 
//                    ( err ) => {
//     if ( err ) {
//         console.log( err );
//         return;
//     }
// } );

//http://localhost:3000/
app.get("/", (req, res) => {
    //res.send("<h1> Hello Node World! FARTS</h1>");
    res.sendFile(__dirname + "/index.html", (err)=> {
        if (err){
            console.log(err);
            return;
        }
    })
    console.log("A user requested the root route");
});


app.post("/", (req, res) => {
    res.send("<h1>the user tried to post " + req.body["my-text"] +"</h1>");
    console.log("user tried to post.")
    console.log(req.body);
  });
  


//http://localhost:3000/about
app.get("/about", (req, res) => {
    res.send("<h1>I am a student at the end of my wits</h1>")
    console.log("A user tried to access the about.");
});


// Simple server operation
app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
});



console.log(add(3,4))
//console.log("end");
