const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose")
const Blog = require("./models/blog");
const { result } = require('lodash');

// Express App
const app = express()

// Register view Engines
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views'); //if views are in a seperate folder

// Middlewares and static files declaration
app.use(express.static('public'))
app.use(express.urlencoded())

// Connect to database
const dbURI = "mongodb://localhost:27017/BlogDB";
mongoose.connect(dbURI).then((result) => {
    console.log("Connected to Mongoose Database");

    // Listen for requests
    app.listen(3000);
}).catch((e) => {
    console.log(e)
})

// Mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) =>{
    const blog = new Blog({
        title: "New Blog 2",
        snippet: "About new Blog",
        body: "Blog Body"
    });

    blog.save().then((result) => {
        res.send(result)
    })
} )

app.get("/get-blog", (req, res) => {
    Blog.find().then((result) => {
        res.send(result)
    }).catch((e) => {
        console.log(e)
    })
})

app.get("/single-blog", (req, res) => {
    Blog.findById("68b1c3d98d8e2126639ca365").then((result) => {
        res.send(result);
    }).catch((e) => {
        console.log(e)
    })
})

app.get("/blogs", (req, res) => {
    Blog.find().sort({createdAt: -1}).then((result) => {
        res.render("index", {title: 'Home', blogs: result})
    }).catch((e)  => {
        console.log(e)
    })
})

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then((result) => {
        res.redirect("/blogs")
    }).catch((e) => {
        console.log(e);
    })
})

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((result => {
        res.render("details", {blog: result, title: "Blog Details"})
    })).catch((e) => {
        console.log(e)
    })
});

app.delete("/blogs/:id", (req, res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then((result) => {
        res.json({redirect : '/blogs'})
    }).catch((e) =>{
        console.log(e)
    })
})

// Log into the console using custom middleware
// app.use((req, res, next) => {
//     console.log("host: ", req.hostname)
//     console.log("path: ", req.path)
//     console.log("method: ", req.method)
//     console.log("\n")
//     next();
// })

app.use(morgan('tiny'));

app.get('/', (req, res)=>{
    // res.send("<p> Hello World! </p>")
    // res.sendFile('./views/index.html', {root: __dirname})

    // instead render a view now
    // res.render("index", {title: 'Home', blogs})


    // REDIRECT IT TO /blogs
    res.redirect("/blogs")
})

app.get('/about', (req, res)=>{
    // res.send("<p> About SHIT </p>")
    // res.sendFile('./views/about.html', {root: __dirname})

    res.render("about", {title: 'About'})

})

//redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about')
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
})

// 404
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname})
    res.status(404).render("404", {title: "404"})
})