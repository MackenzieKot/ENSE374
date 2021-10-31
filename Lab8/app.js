//have mongod running
//have mongo running in another window
//third window for node

// Bring in mongoose
const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost:27017/lab8', 
                  { useNewUrlParser: true, useUnifiedTopology: true });

//create user schema
const userSchema = new mongoose.Schema ({
    _id: Number,
    username: String,
    password: String,
});

//create task schema
const taskSchema = new mongoose.Schema ({
    _id: Number,
    text: String,
    state: String,
    creator: String,
    isTaskClaimed: Boolean,
    claimingUser: String,
    isTaskDone: Boolean,
    isTaskCleared: Boolean,
});

//users collection
const User = mongoose.model ( "User", userSchema );

//tasks collection
const Task = mongoose.model ( "Task", taskSchema );

//insert default users and tasks- keep commented once completed
// User.insertMany( [
//                     {
//                         _id: 0,
//                         username: "usera",
//                         password: "a",
//                     },
//                     {
//                         _id: 1,
//                         username: "userb",
//                         password: "b",
//                     }
//                 ], ( err ) => {
//         if (err) {
//             console.log (err)
//         }
// });

// Task.insertMany( [
//                     {
//                         _id: 0,
//                         text: "this is a task",
//                         state: "unclaimed",
//                         creator: "usera",
//                         isTaskClaimed: false,
//                         claimingUser: null,
//                         isTaskDone: false,
//                         isTaskCleared: false,
//                     },
//                     {
//                         _id: 1,
//                         text: "this is a task",
//                         state: "claimed by usera, unfinished",
//                         creator: "usera",
//                         isTaskClaimed: true,
//                         claimingUser: "usera",
//                         isTaskDone: false,
//                         isTaskCleared: false,
//                     },
//                     {
//                         _id: 2,
//                         text: "this is a task",
//                         state: "claimed by userb, unfinished",
//                         creator: "userb",
//                         isTaskClaimed: true,
//                         claimingUser: "userb",
//                         isTaskDone: false,
//                         isTaskCleared: false,
//                     },
//                     {
//                         _id: 3,
//                         text: "this is a task",
//                         state: "claimed by usera, finished",
//                         creator: "usera",
//                         isTaskClaimed: true,
//                         claimingUser: "usera",
//                         isTaskDone: true,
//                         isTaskCleared: false,
//                     },
//                     {
//                         _id: 4,
//                         text: "this is a task",
//                         state: "claimed by userb, finished",
//                         creator: "userb",
//                         isTaskClaimed: true,
//                         claimingUser: "userb",
//                         isTaskDone: true,
//                         isTaskCleared: false,
//                     }
//                 ], ( err ) => {
//         if (err) {
//             console.log (err)
//         }
// });


async function findInDatabaseUser() {
    try {
        const results = await User.find();
        //console.log(results);
        if ( results.length === 0 ) {
            console.log( "no results found 1" );
            return;
        }
        // this is where we have access to our results
        console.log(results);
    } catch ( error ) {
        console.log( error );
    }
}


async function findInDatabaseTask() {
    try {
        const results = await Task.find();
        //console.log(results);
        if ( results.length === 0 ) {
            console.log( "no results found 2" );
            return;
        }
        // this is where we have access to our results
        console.log(results);
    } catch ( error ) {
        console.log( error );
    }
}

findInDatabaseUser();
findInDatabaseTask();









//lab demo code

// connects to the "test" database (ensure mongod is running!)
// the later arguments fix some deprecation warnings
// mongoose.connect( 'mongodb://localhost:27017/test', 
//                   { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect( 'mongodb://localhost:27017/games', 
//                   { useNewUrlParser: true, useUnifiedTopology: true });

// create a schema
//const Cat = mongoose.model( 'Cat', { name: String });

// create a document following that schema
//const kitty = new Cat({ name: 'Zildjian' });
//kitty.save().then( () => console.log('meow') );

// //create game schema
// const gameSchema = new mongoose.Schema ({
//     name: String,
//     rating: Number,
//     price: Number,
//     review: String
// });

// this creates a collection called `games` (Weird, but intuitive)
// const Game = mongoose.model ( "Game", gameSchema );

// const game = new Game({
//     name: "Gone Golfing",
//     rating: 5,
//     price: 4.99,
//     review: "classic"
// });

//game.save();



// Game.find({ name: "Gone Golfing" }, ( error, results ) => {
//     if ( error ) {
//         console.log( error );
//     } else {
//         console.log( results );
//         if ( results.length === 0 ) {
//             console.log( "no results found" );
//             return;
//         }
//         console.log(results[0].name);
//         // this is where we have access to our results
//     }
// });



//same as abouve but prob easier/preferred
// async function findInDatabase() {
//     try {
//         //promise this is where results will be
//         const results = await Game.find({ name: "Gone Golfing" });
//         console.log(results);
//         if ( results.length === 0 ) {
//             console.log( "no results founds" );
//             return;
//         }
//         // this is where we have access to our results
//         console.log(results[0].name);
//     } catch ( error ) {
//         console.log( error );
//     }
// }

// findInDatabase();



// (async () => {
//     try {
//         await Game.updateOne( { name: "Gone Golfing"}, 
//                               { $set: { rating: 1 } });
//         await Game.updateOne( { name: "Gone Golfing"}, 
//                               { $set: { review: "Need bigger clubs (but not for golf)" } });
//     } catch (error) {
//         console.log(error);
//     }
// })();

//runs faster than above, the above isn't blocking program from moving on
// console.log("hello from the end of the file.");

// Game.deleteOne ( { name: "Gone Golfing" }, ( err ) => {
//     if (err) {
//         console.log (error)
//     }
// });












//alt code
// (async () => {
//     try {
//         await Task.insertMany( 
//             [
//                 {
//                      _id: 0,
//                     text: "this is a task",
//                     state: "unclaimed",
//                     creator: "usera",
//                     isTaskClaimed: false,
//                     claimingUser: null,
//                     isTaskDone: false,
//                     isTaskCleared: false,
//                 },
//                 {
//                     _id: 1,
//                     text: "this is a task",
//                     state: "claimed by usera, unfinished",
//                     creator: "usera",
//                     isTaskClaimed: true,
//                     claimingUser: "usera",
//                     isTaskDone: false,
//                     isTaskCleared: false,
//                 },
//                 {
//                     _id: 2,
//                     text: "this is a task",
//                     state: "claimed by userb, unfinished",
//                     creator: "userb",
//                     isTaskClaimed: true,
//                     claimingUser: "userb",
//                     isTaskDone: false,
//                     isTaskCleared: false,
//                 },
//                 {
//                     _id: 3,
//                     text: "this is a task",
//                     state: "claimed by usera, finished",
//                     creator: "usera",
//                     isTaskClaimed: true,
//                     claimingUser: "usera",
//                     isTaskDone: true,
//                     isTaskCleared: false,
//                 },
//                 {
//                     _id: 4,
//                     text: "this is a task",
//                     state: "claimed by userb, finished",
//                     creator: "userb",
//                     isTaskClaimed: true,
//                     claimingUser: "userb",
//                     isTaskDone: true,
//                     isTaskCleared: false,
//                 }
//             ]
//         );
//     } catch (error) {
//         console.log(error);
//     }
// })();



//more alt code
// (async () => {
//     try {
//         await User.insertMany( 
//             [
//                 {
//                     username: "usera",
//                     password: "a",
//                 },
//                 {
//                     username: "userb",
//                     password: "b",
//                 }
//             ]
//         );
//     } catch (error) {
//         console.log(error);
//     }
// })();
