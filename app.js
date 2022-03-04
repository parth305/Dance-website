
const express = require("express");
const path = require("path");
const User = require("./user");
const mongoose = require("mongoose");
const { response } = require("express");

mongoose.connect("mongodb://localhost/bhyu");

const port = 80;

const app = express();
app.use(express.urlencoded());

//for viewing static files on browser 
app.use("/static", express.static("static"));

//for using pug as template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.get("/", (req, res) => {
    res.status(200).render("home.pug");
})

app.get("/contect", (req, res) => {
    console.log(req.body);
    res.status(200).render("contect.pug");

})

app.post("/submit", (req, res) => {

    let detail = req.body;
    let add = detail.address.split(",");
    try {
        let person = new User({
            name: detail.name,
            age:detail.age,
            phone: detail.phone,
            address: {
                housenumber: add[0],
                street: add[1],
                city: add[2],
                state: add[3]
            },
            email: detail.email,
            more: detail.more
        });
        person.save().then(response => console.log(response));
    }
    catch (error) {
        console.log(error.message);
    }
    res.status(200).render("contect.pug");
})

app.listen(port, (req, res) => {
    console.log("app started");
})
