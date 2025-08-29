const express = require('express');
const morgan = require('morgan')

// Express App
const app = express()

// Register view Engines
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views'); //if views are in a seperate folder

// Log into the console using custom middleware
// app.use((req, res, next) => {
//     console.log("host: ", req.hostname)
//     console.log("path: ", req.path)
//     console.log("method: ", req.method)
//     console.log("\n")
//     next();
// })

// Listen for requests
app.listen(3000)

// Middlewares and static files declaration
app.use(express.static('public'))

const blogs = [
  ];

app.use(morgan('tiny'));

app.get('/', (req, res)=>{
    // res.send("<p> Hello World! </p>")
    // res.sendFile('./views/index.html', {root: __dirname})

    // instead render a view now
    res.render("index", {title: 'Home', blogs})
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