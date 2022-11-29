const express = require("express");
const { closeSync } = require("fs");
const app = express()
const PORT = 3000

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Container = require('./productos')

//view engine

app.set("views", "./views/ejs")
app.set("view engine", "ejs")
app.set("views", "./views/ejs")

let prod = new Container('./productos.json')

app.get("/datos", (req, res, next) => {
    let { min, max, titulo } = req.query;
    res.render("index-pug", req.query)
})
app.get("/", (req, res, next) => {
    res.render("index", { prod })
})

app.post("/create", async (req, res, next) => {
    let product = req.body
    if (product) {
        await prod.save(product)
        res.redirect('/productos')
    }
    else { console.log('error') }

})


app.get("/productos", async (req, res, next) => {
    const productos = await prod.getAll()
    console.log(productos)
    res.render("historial", { productos })
})

app.listen(PORT)