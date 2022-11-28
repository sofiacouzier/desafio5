const express = require("express");
const { closeSync } = require("fs");
const app = express()
const PORT = 3000

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//view engine

app.set("views", "./views/ejs")
app.set("view engine", "ejs")

let personas = []

app.get("/datos", (req, res, next) => {
    let { min, max, titulo } = req.query;
    res.render("index-pug", req.query)
})
app.get("/", (req, res, next) => {
    res.render("index", { personas })
})

app.post("/create", (req, res, next) => {
    personas.push(req.body)
    res.redirect("/")
    console.log(personas)
})

app.listen(PORT)