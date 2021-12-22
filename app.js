const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 7000;

// MONGOOSE SCHEMA
var ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', ContactSchema);


// EXPRESS STUFF
app.use('/static', express.static('static')); // for serving static files
app.use(express.urlencoded({extended: true}));

// PUG STUFF
app.set('view engine', 'pug');  // set template engine as pug
app.set('views', path.join(__dirname, 'views')); // set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
    const params = {};
    res.status(200).render("home.pug");
});

app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render("contact.pug");
});

app.post("/contact", (req, res) => {
    var MyData = new Contact(req.body);
    MyData.save().then(() => {
        res.send("This item has been saved to the database");
    }).catch(() => {
        res.status(400).send("Item was not saved to the database");
    });
    
    // res.status(200).render("contact.pug");
});


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
});