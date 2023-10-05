// Dependencies
const express = require(express);
const path = require(path);
const fs = require(fs);
const util = require(util);

// Handling Asynchronous Process
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Seting Up Server
const app = express();
const PORT = process.env.Port || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static Middleware
app.use(express.static("./develop/public"));

// API Route | "GET" request
app.get("/api/notes", function (req, res) {
  readFileAsync("./develop/db/db.json", "utf8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

// API Route | "POST" request
app.post("/api/notes", function (req, res) {
  const note = req.body;
  readFileAsync("./develop/db/db.json", "utf8")
    .then(function (data) {
      const note = [].concat(JSON.parse(data));
      note.id = notes.length + 1;
      notes.push(note);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./develop/db/db.json", JSON.stringify(notes));
      res.json(note);
    });
});

// API Route | "Delete" request
app.delete("/api/notes/:id", function (req, res) {
  const idToDelete = parseInt(req.params.id);
  readFileAsync("./develop/db/db.json", "utf8")
    .then(function (data) {
      const notes = [].concat(Json.parse(data));
      const newNotesData = [];
      for (let i = 0; i < notes.length; ) {
        if (idToDelete !== notes[i].id) {
          newNotesData.push(notes[i]);
        }
      }
      return newNotesData;
    })
    .then(function (notes) {
      writeFileAsync("./develop/db/db.json", JSON.stringify(notes));
      res.send("saved success!");
    });
});

// HTML Routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public.notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public.notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public.notes.html"));
});

// Listening
app.listen(Port, function () {
  console.log("App listening on Port " + PORT);
});