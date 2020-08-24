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
     //thing = await new DatabaseController(process.env.DATABASE_URL).create()
     var menuResult = await new DatabaseController(process.env.DATABASE_URL).command('Select name, animal_type, image, owner FROM stuffies ORDER BY name ASC;')
     var stevenStuffies = []
     var monicaStuffies = []
     for (num in menuResult.rows) {
          if (menuResult.rows[num].owner === "Monica") {
               monicaStuffies.push(menuResult.rows[num])
          }
          else if (menuResult.rows[num].owner === "Steven") {
               stevenStuffies.push(menuResult.rows[num])
          }
     }
     const anchorDateSteven = new Date(2020, 7, 22)
     const anchorDateMonica = new Date(2020, 7, 12)
     var currentDate = new Date()
     var currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
     var dateDifferenceSteven = ((currentDate.getTime() - anchorDateSteven.getTime())/(1000*60*60*24)) % stevenStuffies.length
     var dateDifferenceMonica = ((currentDate.getTime() - anchorDateMonica.getTime())/(1000*60*60*24)) % monicaStuffies.length
     var stevenStuffyOfTheDay = stevenStuffies[dateDifferenceSteven]
     var monicaStuffyOfTheDay = monicaStuffies[dateDifferenceMonica]
     res.render("homepage.ejs", {
          nameSteven: stevenStuffyOfTheDay.name,
          nameMonica: monicaStuffyOfTheDay.name,
          stuffies: [monicaStuffyOfTheDay.name, stevenStuffyOfTheDay.name], 
          imageSteven: stevenStuffyOfTheDay.image, 
          imageMonica: monicaStuffyOfTheDay.image, 
          options: menuResult.rows
     })
})

app.get("/:stuffyName/:stuffyType", async function(req, res) {
     console.log(req.params.stuffyName)
     console.log(req.params.stuffyType)
     menuResult = await new DatabaseController(process.env.DATABASE_URL).command('Select name, animal_type FROM stuffies ORDER BY name ASC;')
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
               other_notes : dbResult.rows[0].other_notes,
               options: menuResult.rows
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