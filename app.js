//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = process.env.PORT || 5000

const homeStartingContent =
  "Hola!! Welcome to my blog website. Here you can posts your daily thoughts and feelings anonymously and and can be read by anyone who visits this website";
const aboutContent =
  "I am Rounit Singh, currently pursuing B.tech from Madan Mohan Malaviya University of Technology, and is learning to be a MERN stack developer";
const contactContent =
  "You can reach me through my email or contact number";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(__dirname + "/views"));

let inputs = [];

app.get("/", function (req, res) {
  res.render("home", {p1:homeStartingContent, composeOutput: inputs});
 
});

app.get("/posts/:topic", function(req,res){
  const parame = (req.params.topic);

  inputs.forEach(function(post){
    const storedTitle = post.Title;
    if(parame === storedTitle){
      res.render("post", {title: post.Title, post: post.Post})
    }

  })
})

app.get("/about", function(req,res){
  res.render("about",{p1:aboutContent} );
});

app.get("/contact", function(req,res){
  res.render("contact", {p1:contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose", {composeOutput: inputs});
})

app.post("/", function(req,res){
  

  let Post = {
    Title : req.body.inTitle,
    Post : req.body.inPost
  };

  inputs.push(Post);

  res.redirect("/");
});

app.listen(port, function () {
  console.log("Server started on port 5000");
});
