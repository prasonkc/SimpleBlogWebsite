const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose")
const blogRoutes = require("./routes/blogRoutes")

// Express App
const app = express()

// Register view Engines
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views'); //if views are in a seperate folder

// Middlewares and static files declaration
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Connect to database
const dbURI = "mongodb://localhost:27017/BlogDB";
mongoose.connect(dbURI).then((result) => {
    console.log("Connected to Mongoose Database");

    // Listen for requests
    app.listen(3000);
}).catch((e) => {
    console.log(e)
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

// Route to blog routes
app.use('/blogs', blogRoutes);

// 404
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname})
    res.status(404).render("404", {title: "404"})
})