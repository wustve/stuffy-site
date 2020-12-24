const express = require("express")
const app = express()
const ejs = require('ejs')
const { DatabaseController } = require("./database")
var { DateTime } = require('luxon')
const { body, validationResult } = require('express-validator')
//const basic = require('./router/basic')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//app.use('/', basic)

app.use(async (req, res, next) => {
     try {
          var menuResult = await new DatabaseController(process.env.DATABASE_URL).command('Select name, animal_type, image, owner FROM stuffies ORDER BY name, animal_type ASC;')
          let stevenStuffy, monicaStuffy;
          [stevenStuffy, monicaStuffy] = stuffyOfTheDay(menuResult);
          var pageInfo = {
               stevenStuffy: stevenStuffy,
               monicaStuffy: monicaStuffy,
               options: menuResult.rows
          }
          res.locals.pageInfo = pageInfo
     }
     catch {
          console.log("ERROR: Something went wrong retrieving items from the db");
     }  
     next();
})

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
     try {
          res.render("homepage.ejs", res.locals.pageInfo)
     }
     catch (err) {
          console.log(err.message)
          res.render("error.ejs")
     }
})

app.get('/login', async (req, res) => {
     if (res.locals.pageInfo) {
          res.render ("login.ejs", res.locals.pageInfo);
     }
     else {
          res.render("error.ejs")
     }
})

app.get("/:stuffyName/:stuffyType", async function (req, res) {
     console.log(req.params.stuffyName)
     console.log(req.params.stuffyType)
     var pageInfo = res.locals.pageInfo
     var dbResult = await new DatabaseController(process.env.DATABASE_URL).command("SELECT * FROM stuffies WHERE name = $1 AND animal_type = $2", [req.params.stuffyName.replace(/_/g, ' '), req.params.stuffyType])
     if (dbResult.rowCount > 0) {
          pageInfo.selectedStuffy = dbResult.rows[0]
          res.render("article.ejs", pageInfo)
     }
     else {
          res.render("error.ejs")
     }
})

app.post("/:stuffyName/:stuffyType", [
     body('name').not().isEmpty(),
     body('animalType').not().isEmpty(),
     body('owner').not().isEmpty(),
     body('image').not().isEmpty(),
     body('image').isURL(),
],async (req, res) => {

     const errors = validationResult(req)
     console.log(errors)

     if(!errors.isEmpty()){
          return res.send('Invalid Fields')
     }

     var query = 'Update stuffies Set name = $1, animal_type = $2, image = $3, owner = $4, name_origin = $5, origin = $6, other_notes = $7 WHERE name = $8 AND animal_type = $9'
     const originalName = req.params.stuffyName.replace(/_/g, ' ')
     const originalType = req.params.stuffyType.replace(/_/g, ' ')
     var values = [req.body.name, req.body.animalType, req.body.image, req.body.owner, req.body.nameOrigin, req.body.origin, req.body.otherNotes, originalName, originalType]
     await new DatabaseController(process.env.DATABASE_URL).command(query, values)
     res.send('Success')
})

app.get("*", function (req, res) {
     res.render("error.ejs")
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})