// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

var listTodo = [
  { title: "Đi chợ" },
  { title: "Nấu cơm" },
  { title: "Rửa bát" },
  { title: "Học code tại codersX" },
  { title: "Ngắm gái xinh Huflit" }
]

app.set('view engine', 'pug')
app.set('views', './views')

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/todos", (request, response) => {
  response.render('todos.pug', {
    todos: listTodo
  })
});

app.get("/todos/search", (request, response) => {
  var valueSearch = '';
  var q = request.query.q;
  valueSearch = q;
  var matchedTodos = listTodo.filter(item => {
    return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  response.render('todos.pug', {
    todos: matchedTodos,
    value: valueSearch
  })
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
