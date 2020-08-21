const express = require("express")
const app = express()
const ejs = require('ejs')

app.set('view engine', 'ejs')
require("dotenv").config()

app.get('/', (req, res) => {
     //res.send(ejs.render('<%= fish%>', {fish: 'shark'}))
     res.render('index.ejs', {fish : 'sharker'})
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})