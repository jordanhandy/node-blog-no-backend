// Declare modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

let port = 3000 || process.env.PORT;
// Array of Blog Posts
let blogPosts = [];

const homeStartingContent = "Welcome to the home page.";
const aboutContent = "This about page is simply a placeholder.  This project allows you to post new items to a fictional blog";
const contactContent = "Please contact me through jordanhandy@vivaldi.net";

const app = express();

// Set the view engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
// Declare public folder for assets
app.use(express.static("public"));

// Routes
// Home
app.get("/", function(req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    newBlogPosts: blogPosts
  });
});
// About
app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});
// Contact
app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});
// Compose page
app.get("/compose", function(req, res) {
  res.render("compose")
});
// 404 Error page
app.get("/404", function(req,res){
  res.render("error");
});

// /Posts subpage with wildcard "Post Title"
app.get("/posts/:postTitle", function(req, res) {
  // Set requestedTitle to the postTitle in the page
  const requestedTitle = _.lowerCase(req.params.postTitle);
  // If the requsted title URL is empty, redirect to 404
  if (blogPosts.length === 0) {
    res.redirect("/404")
  }
  // If the requsted title URL is equal to the post title
  blogPosts.forEach(function(post) {
    if (_.lowerCase(post.title) === requestedTitle) {
      res.render("post", {
        postTitle: post.title,
        postContent: post.contents
      });
    }
    // Else redirect to 404
    else{
      res.redirect("/404");
    }
  });
});
// Post Compose page
// Post blogpost object
app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    contents: req.body.postContent
  };
  // Push to array
  // Redirect back home

  blogPosts.push(post);
  res.redirect("/");
});

// Log listening port.
app.listen(process.env.PORT || port, function() {
  console.log("Server started on port" + port);
});
