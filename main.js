const express = require("express")
const app = express()
const ejs = require('ejs')
const { DatabaseController } = require("./database")
var { DateTime } = require('luxon')
const { body, validationResult } = require('express-validator')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

require("dotenv").config()

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

function stuffyOfTheDay(stuffies) {
     let stevenStuffies = []
     let monicaStuffies = []
     const anchorDateSteven = DateTime.fromISO('2020-08-22', { zone: 'America/Toronto' })
     const anchorDateMonica = DateTime.fromISO('2020-08-12', { zone: 'America/Toronto' })
     let currentDate = new Date()
     for (num in stuffies.rows) {
          if (stuffies.rows[num].owner === "Monica") {
               monicaStuffies.push(stuffies.rows[num])
          }
          else if (stuffies.rows[num].owner === "Steven") {
               stevenStuffies.push(stuffies.rows[num])
          }
     }
     let dateDifferenceSteven = Math.floor((currentDate - anchorDateSteven) / (1000 * 60 * 60 * 24)) % stevenStuffies.length
     let dateDifferenceMonica = Math.floor((currentDate - anchorDateMonica) / (1000 * 60 * 60 * 24)) % monicaStuffies.length
     let stevenStuffy = stevenStuffies[dateDifferenceSteven]
     let monicaStuffy = monicaStuffies[dateDifferenceMonica]
     return [stevenStuffy, monicaStuffy]
}



app.get('/', async (req, res) => {
     var menuResult = await new DatabaseController(process.env.DATABASE_URL).command('Select name, animal_type, image, owner FROM stuffies ORDER BY name, animal_type ASC;')

     try {
          let stevenStuffy, monicaStuffy
          [stevenStuffy, monicaStuffy] = stuffyOfTheDay(menuResult)
          res.render("homepage.ejs", {
               stevenStuffy: stevenStuffy,
               monicaStuffy: monicaStuffy,
               //stuffies: [monicaStuffy.name, stevenStuffy.name], 
               options: menuResult.rows
          })
     }
     catch (err) {
          console.log(err.message)
          res.render("error.ejs")
     }
})

app.get("/:stuffyName/:stuffyType", async function (req, res) {
     console.log(req.params.stuffyName)
     console.log(req.params.stuffyType)
     var menuResult = await new DatabaseController(process.env.DATABASE_URL).command('Select name, animal_type,owner FROM stuffies ORDER BY name, animal_type ASC;')
     var dbResult = await new DatabaseController(process.env.DATABASE_URL).command("SELECT * FROM stuffies WHERE name = $1 AND animal_type = $2", [req.params.stuffyName.replace(/_/g, ' '), req.params.stuffyType])

     console.log(dbResult)
     if (dbResult.rowCount > 0) {
          let stevenStuffy, monicaStuffy
          [stevenStuffy, monicaStuffy] = stuffyOfTheDay(menuResult)
          res.render("article.ejs", {
               stevenStuffy: stevenStuffy,
               monicaStuffy: monicaStuffy,
               selectedStuffy: dbResult.rows[0],
               options: menuResult.rows
          })
     }
     else {
          res.render("error.ejs")
     }
})

app.post("/:stuffyName/:stuffyType", async (req, res) => {
     var query = 'Update stuffies Set name = $1, animal_type = $2, image = $3, owner = $4, name_origin = $5, origin = $6, other_notes = $7 WHERE name = $8 AND animal_type = $9'
     const originalName = req.params.stuffyName.replace(/_/g, ' ')
     const originalType = req.params.stuffyType.replace(/_/g, ' ')
     var values = [req.body.name, req.body.animalType, req.body.image, req.body.owner, req.body.nameOrigin, req.body.origin, req.body.otherNotes, originalName, originalType]
     await new DatabaseController(process.env.DATABASE_URL).command(query, values)
     res.redirect('back')
})

app.get("*", function (req, res) {
     res.render("error.ejs")
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})