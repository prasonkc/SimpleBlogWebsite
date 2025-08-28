const express = require('express');

// Express App
const app = express()

// Register view Engines
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views'); //if views are in a seperate folder

// Listen for requests
app.listen(3000)

const blogs = [
  ];

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