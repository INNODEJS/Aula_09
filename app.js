const express = require("express")
const axios = require("axios")
const ejs = require("ejs")
const bodyParser = require("body-parser")

const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", async (req, res) => {
    try {
        // Conexão com a API
        const response = await axios.get("https://fakestoreapi.com/products")
        const products = response.data

        res.render("products", { products })
    
    }

    catch (error) {
        console.log(error)
    }
})

app.get("/eletronicos", async (req, res) => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products/category/electronics")
        const products_elet = response.data
        res.render("products_elet", { products_elet })
    }
    catch (error) {
        console.log(error)
    }
})

app.get("/joias", async (req, res) => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products/category/jewelery")
        const products_jew = response.data
        res.render("products_jew", { products_jew })
    }
    catch (error) {
        console.log(error)
    }
})

app.get("/vestuario", async (req, res) => {
    try {
        const response_men = await axios.get("https://fakestoreapi.com/products/category/men's clothing")
        const response_women = await axios.get("https://fakestoreapi.com/products/category/women's clothing")
     
        const prod_men = response_men.data
        const prod_women = response_women.data
        const vestuario = await [...prod_men, ...prod_women]
        res.render ("products_clo", {vestuario})
    }
    catch (error) {
        console.log(error)
    }
})

let cart = []

app.post("/carrinho", async (req, res) => {
    const produto = await parseInt(req.body.Comprado)
    const response = await axios.get(`https://fakestoreapi.com/products/${produto}`)
    const productCart = response.data
    cart.push(productCart)
    res.redirect("/carrinho")
})

app.get("/carrinho", (req, res) => {
    res.render("carrinho", { cart })
})

// app.post("/remover", (req, res) => {
//     const excluir = req.body.removido
//     cart = cart.filter((item) => {
//         return item.id != excluir
//     })
//     res.redirect("/carrinho")
// })

app.post("/remover", (req, res) => {
    const itemRemovido =  parseInt(req.body.removido)
    const removidoIndex = cart.findIndex(item => item.id === itemRemovido)
    if (removidoIndex !==-1) {
        cart.splice(removidoIndex, 1)
    }
    res.redirect("/carrinho")
})


app.listen(3000, () => {
    console.log('Server ON')
})

