import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { allPosts: posts });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.get("/post/:postId", (req, res) => {
  const requestedPostId = parseInt(req.params.postId);
  const post = posts[requestedPostId];
  if (post) {
    res.render("post.ejs", { 
      title: post.title, 
      content: post.content, 
      postID: requestedPostId });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/compose", (req, res) => {
  const postTitle = req.body.postTitle;
  const postContent = req.body.postContent;
  // Here you would typically save the post to a database
  posts.push({ title: postTitle, content: postContent });
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const postIdToDelete = parseInt(req.body.postId);
  posts = posts.filter((_, index) => index !== postIdToDelete);
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Blog Capstone app listening at http://localhost:${port}`);
});