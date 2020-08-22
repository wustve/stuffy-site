const express = require("express")
const app = express()
const ejs = require('ejs')
const { DatabaseController } = require("./database")

require("dotenv").config()

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
     //res.send(ejs.render('<%= fish%>', {fish: 'shark'}))
     //res.render('index.ejs', {fish : 'tuna', image: 'https://media.discordapp.net/attachments/515341359771680788/746389232192585788/20200821_112356.jpg?width=509&height=679', options :[1,2,3]})
     res.render("homepage.ejs", {stuffies: ["happyfeet", "wolfy"], imageSteven: "https://cdn.discordapp.com/attachments/515341359771680788/746501441832747019/IMG_20200821_184907.jpg", imageMonica: "https://cdn.discordapp.com/attachments/515341359771680788/746435637149696020/20200821_142806.jpg", options: [('agerger sdfsd','bear'),('agerger sdfsd','bear'),('agerger sdfsd','bear'),('agerger sdfsd','bear')]})
})

app.get("/:stuffyName/:stuffyType", async function(req, res) {
     console.log(req.params.stuffyName)
     console.log(req.params.stuffyType)
     dbResult = await new DatabaseController(process.env.DATABASE_URL).command("SELECT * FROM stuffies WHERE name = $1 AND animal_type = $2", [req.params.stuffyName, req.params.stuffyType])
     console.log(dbResult)
     if (dbResult.rowCount > 0) {
          res.render("article.ejs", {
               name : dbResult.rows[0].name, 
               animal_type : dbResult.rows[0].animal_type, 
               image : dbResult.rows[0].image, 
               owner: dbResult.rows[0].owner, 
               name_origin : dbResult.rows[0].name_origin, 
               origin :  dbResult.rows[0].origin, 
               other_notes : dbResult.rows[0].other_notes
          })
     }
     else {
          res.render("error.ejs")
     }
})

app.get("*", function(req, res) {
     res.render("error.ejs")
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})