const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

require("dotenv").config();
const Blog = require("./database/model");

mongoose
  .connect(`${process.env.DB_STRING}/blog`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/get-blog", (req, res) => {
  Blog.find(function (err, datas) {
    if (err) return console.error(err);
    console.log(datas);
    res.json(datas);
  });
});

app.get("/get-blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id,function (err, user) {
    if (err) return console.error(err);
    console.log(user);
    res.json(user);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});
app.get("/style", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "style.css"));
});
app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/scriptjs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "script.js"));
});

app.get("/get-blog/:id", (req, res) => {
  res.send("<h>get by id</h>");
});

//post data 
app.post("/add-blog", (req, res) => {
  console.log(req.body);
  let { title, description, date, username } = req.body;
  console.log(description, username, date, title);
  Blog({
    title,
    description,
    date,
    username
  }).save((err, data) => {
    if (err) throw err;
    console.log(data);
  });
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/edit-blog/:id", (req, res) => {
  let updateId = req.params.id;
  Blog.findOneAndUpdate(
    {
      _id: updateId,
    },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        username: req.body.username,
      },
    },
    {
      upsert: true,
    },
    function (err, newBlog) {
      if (err) {
        res.send("error updating book");
      } else {
        console.log(newBlog);
      }
    }
  );
  res.sendFile(path.join(__dirname, "public", "main.html"));
});

app.delete("/delete-blog/:id", (req, res) => {
  let deleteId = req.params.id;
  console.log(typeof deleteId);
  Blog.findByIdAndDelete(deleteId, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
    res.sendFile(path.join(__dirname, "public", "main.html"));
  });
});

app.listen(3000, () => {
  console.log("server run on port number 3000");
});
