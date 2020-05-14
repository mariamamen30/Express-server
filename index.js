const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

const todoDB = JSON.parse(fs.readFileSync("./todos list.json", "utf8")) || [];
console.log(todoDB);

//List all the TODO
app.get("/todos", (req, res) => {
  res.send(`<ol>${todoDB.map(element => `<li>${element.title}</li>`)}<ol>`);
});

app.get("/", (req, res) => {
  res.send(`<ol>${todoDB.map(element => `<li>${element.title}</li>`)}<ol>`);
});
//Get note by Id
app.get("/todos/:id", (req, res) =>
  res.send(db.find(e => e.id == req.params.id))
);
//Delete note by Id
app.delete("/todos/:id", (req, res) => {
  deletNote(+req.params.id);
  res.statusCode = 200;
  res.send("Note deleted successfully");
});

//Update a note
app.patch("/todos/:id/:title", (req, res) => {
  update(+req.params.id, req.params.title);
  res.send("title updated successfully");
});

//add a note
app.post("/todos/:title", (req, res) => {
  add(req.params.title);
  res.send("note added successfully");
});

//functions
const deletNote = id => {
  const newdb = todoDB.filter(note => note.id != id);
  fs.writeFileSync("./todos list.json", JSON.stringify(newdb, null, 2), "utf8");
};

const update = (id, newTitle) => {
  todoDB[+id - 1].title = newTitle;
  fs.writeFileSync(
    "./todos list.json",
    JSON.stringify(todoDB, null, 2),
    "utf8"
  );
};

const add = title => {
  todoDB.push({ id: todoDB.length + 1, title: title });
  fs.writeFileSync(
    "./todos list.json",
    JSON.stringify(todoDB, null, 2),
    "utf8"
  );
};

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
