var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    morgan = require("morgan");

var app = express(),
    db = mongoose.connect("mongodb://localhost/todos");

//MongoDB setup
var Schema = mongoose.Schema;
var TodoSchema = new Schema({
    text: String,
    createdOn: { type: Date, default: Date.now },
    completed: Boolean,
    completedOn: Date
});

mongoose.model("Todo", TodoSchema);

var Todo = mongoose.model("Todo");

// //Create a sample Todo
// var Todo = mongoose.model("Todo");
// var todo = new Todo({
//     text: "Example Todo",
//     completed: false,
//     completedOn: undefined
// });

// todo.save(function(error, data){
//     if (error){
//         console.log('Error occured while saving Example Todo');
//         return;
//     }
//     console.log('Example Todo has been saved...');
// });

//Middlewares
//Allowing CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//APIs
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/todos', function (req, res) {
    Todo.find({}, function (error, data) {
        if (error) {
            console.log('Error occured while fetching Todos');
            res.send(error);
            return;
        }
        res.send(data);
    });
});

app.post('/todos', function(req, res){
    var todo = new Todo(req.body);

    todo.save(function (error, data) {
        if (error) {
            console.log('Error occured while saving...');
            res.send(error);
            return;
        }
        res.send(data);
    });
});

//Bootstrap express server
app.listen(3000, function () {
    console.log('Server started at port 3000...');
});