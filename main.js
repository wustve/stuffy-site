const express = require("express")
const app = express()
const ejs = require('ejs')
const { DatabaseController } = require("./database")

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
require("dotenv").config()

let a = new DatabaseController(process.env.DATABASE_URL);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
     //res.send(ejs.render('<%= fish%>', {fish: 'shark'}))
     res.render('index.ejs', {fish : 'tuna', image: 'https://media.discordapp.net/attachments/515341359771680788/746389232192585788/20200821_112356.jpg?width=509&height=679', options :[1,2,3]})
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})