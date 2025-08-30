const express = require("express");
const router = express.Router();
const {blog_index, blog_details, blog_create_get, blog_create_post, blog_delete} = require("../controllers/blogController");

// DEV ROUTES
// router.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New Blog 2",
//     snippet: "About new Blog",
//     body: "Blog Body"
//   });
//   blog.save().then(result => res.send(result));
// });


// router.get("/get-blog", (req, res) => {
//   Blog.find().then(result => res.send(result));
// });

// router.get("/single-blog", (req, res) => {
//   Blog.findById("68b1c3d98d8e2126639ca365").then(result => res.send(result));
// });

// main routes
router.get("/", blog_index);
router.get('/create', blog_create_get);
router.post("/", blog_create_post);
router.get("/:id", blog_details);
router.delete("/:id", blog_delete);



module.exports = router;
