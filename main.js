const express = require("express")
const app = express()
const ejs = require('ejs')
const { DatabaseController } = require("./database")

require("dotenv").config()

<<<<<<< HEAD
let database = new DatabaseController(process.env.DATABASE_URL);
=======
//let database = new DatabaseController(process.env.DATABASE_URL);
//var result = database.select().then((res)=>{return res})
//var result = database.select().then((response) => {console.log(response)})
>>>>>>> f8c1cbdecf7ae448c39782f9fa48bbae247599d0
//database.create()
//database.client.commit()
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
     
     database.select()
     //res.send(ejs.render('<%= fish%>', {fish: 'shark'}))
     //res.render('index.ejs', {fish : 'tuna', image: 'https://media.discordapp.net/attachments/515341359771680788/746389232192585788/20200821_112356.jpg?width=509&height=679', options :[1,2,3]})
     res.render("homepage.ejs", {stuffies: ["happyfeet", "wolfy"], imageSteven: "https://cdn.discordapp.com/attachments/515341359771680788/746501441832747019/IMG_20200821_184907.jpg", imageMonica: "https://cdn.discordapp.com/attachments/515341359771680788/746435637149696020/20200821_142806.jpg"})
})

<<<<<<< HEAD
app.get("/:stuffyName", function(req, res) {
     res.render("index.ejs", {fish : 'tuna', image: 'https://media.discordapp.net/attachments/515341359771680788/746389232192585788/20200821_112356.jpg?width=509&height=679', options :[1,2,3]})
=======
app.get("/stuffies/:stuffyName", async function(req, res) {
     console.log(req.params.stuffyName)
     content = await new DatabaseController(process.env.DATABASE_URL).select(req.params.stuffyName)
     console.log(content)
     console.log(content.rows[0].animal_type)
     res.render("article.ejs", {result : content.rows[0].animal_type})
     //res.render("index.ejs", {fish : 'tuna', image: 'https://media.discordapp.net/attachments/515341359771680788/746389232192585788/20200821_112356.jpg?width=509&height=679', options :[1,2,3]})
>>>>>>> f8c1cbdecf7ae448c39782f9fa48bbae247599d0
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})