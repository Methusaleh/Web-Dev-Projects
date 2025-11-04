import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

let posts = [];
try {
  const data = fs.readFileSync("posts.json", "utf8");
  posts = JSON.parse(data);
} catch (err) {
  console.error("Error reading posts.json:", err);
}

function savePosts() {
  fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2), "utf8");
}

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

app.get("/edit/:postId", (req, res) => {
  const requestedPostId = parseInt(req.params.postId);
  const post = posts[requestedPostId];
  if (post) {
    res.render("edit.ejs", { 
      post: post, 
      postID: requestedPostId });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/compose", (req, res) => {
  const postTitle = req.body.postTitle;
  const postContent = req.body.postContent;
  // Here you would save the post to a database
  posts.push({ title: postTitle, content: postContent });
  savePosts();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const postIdToDelete = parseInt(req.body.postId);
  posts = posts.filter((_, index) => index !== postIdToDelete);
  savePosts();
  res.redirect("/");
});

app.post("/update/:postId", (req, res) => {
  const postIdToUpdate = parseInt(req.params.postId);
  const updatedTitle = req.body.postTitle;
  const updatedContent = req.body.postContent;
  if (posts[postIdToUpdate]) {
    posts[postIdToUpdate] = { title: updatedTitle, content: updatedContent };
    savePosts();
    res.redirect(`/post/${postIdToUpdate}`);
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, () => {
  console.log(`Blog Capstone app listening at http://localhost:${port}`);
});