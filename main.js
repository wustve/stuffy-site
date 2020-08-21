const express = require("express")
const app = express()
const ejs = require('ejs')

app.set('view engine', 'ejs')
require("dotenv").config()

app.get('/', (req, res) => {
     //res.send(ejs.render('<%= fish%>', {fish: 'shark'}))
     res.render('index.ejs', {fish : 'tuna', image: 'https://media.discordapp.net/attachments/515341359771680788/746389232192585788/20200821_112356.jpg?width=509&height=679'})
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})