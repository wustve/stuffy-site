const express = require("express")
const app = express()
const ejs = require('ejs')
const { DatabaseController } = require("./database")
var {DateTime} = require('luxon')

require("dotenv").config()

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
     await new DatabaseController(process.env.DATABASE_URL).create()


     var menuResult = await new DatabaseController(process.env.DATABASE_URL).command('Select name, animal_type, image, owner FROM stuffies ORDER BY name ASC;')
     const anchorDateSteven = DateTime.fromISO('2020-08-22',{zone : 'America/Toronto'})
     const anchorDateMonica = DateTime.fromISO('2020-08-12',{zone : 'America/Toronto'})
     var currentDate = new Date()
     var stevenStuffies = []
     var monicaStuffies = []
     for (num in menuResult.rows) {
          if (menuResult.rows[num].owner === "Monica") {
               monicaStuffies.push(menuResult.rows[num])
               console.log(await stevenStuffies[0])
          }
          else if (menuResult.rows[num].owner === "Steven") {
               stevenStuffies.push(menuResult.rows[num])
          }
     }
     var dateDifferenceSteven = Math.floor((currentDate - anchorDateSteven)/(1000*60*60*24)) % stevenStuffies.length
     var dateDifferenceMonica = Math.floor((currentDate - anchorDateMonica)/(1000*60*60*24)) % monicaStuffies.length
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
     dbResult = await new DatabaseController(process.env.DATABASE_URL).command("SELECT * FROM stuffies WHERE name = $1 AND animal_type = $2", [req.params.stuffyName.replace(/_/g,' '), req.params.stuffyType])
     
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