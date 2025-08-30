const Blog = require("../models/blog");


const blog_index = (req, res) => {
      Blog.find().sort({ createdAt: -1 })
    .then(result => res.render("index", { title: 'Home', blogs: result }))
    .catch(err => console.log(err));
}

const blog_details = (req, res) => {
      Blog.findById(req.params.id)
    .then(result => res.render("details", { blog: result, title: "Blog Details" }))
    .catch(res.status(404).render("404", {title: "Blog not found"}));
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
}
const blog_create_post = (req, res) => {
      const blog = new Blog(req.body);
      blog.save()
        .then(() => res.redirect("/blogs"))
        .catch(err => console.log(err));
}

const blog_delete = (req, res) => {
      Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json({ redirect: '/blogs' }))
    .catch(err => console.log(err));
}


module.exports = {blog_index, blog_details, blog_create_get, blog_create_post, blog_delete}