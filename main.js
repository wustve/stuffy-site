const express = require("express")
const app = express()
const ejs = require('ejs')
const { DatabaseController } = require("./database")
var { DateTime } = require('luxon')
const { body, validationResult } = require('express-validator')
const session = require('express-session')
//const basic = require('./router/basic')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//app.use('/', basic)

require("dotenv").config()

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.use(session({
     secret : process.env.SECRET,
     resave : true,
     samesite: 'lax',
     saveUninitialized: false
}))

async function menuRetrieve(req) {
     try {
          var menuResult = await new DatabaseController(process.env.DATABASE_URL).command('Select name, animal_type, image, owner FROM stuffies ORDER BY name, animal_type ASC;')
          let stevenStuffy, monicaStuffy;
          [stevenStuffy, monicaStuffy] = await stuffyOfTheDay(menuResult);
          return {
               stevenStuffy: stevenStuffy,
               monicaStuffy: monicaStuffy,
               options: menuResult.rows,
               session: req.session
          }
     }
     catch {
          console.log("ERROR: Something went wrong retrieving items from the db");
     }
}

async function stuffyOfTheDay(stuffies) {
     let stevenStuffies = []
     let monicaStuffies = []
     const anchorDateSteven = DateTime.fromISO('2020-08-22', { zone: 'UTC' })
     const anchorDateMonica = DateTime.fromISO('2020-08-12', { zone: 'UTC' })
     let currentDate = DateTime.local().setZone("America/Toronto")
     currentDate = currentDate.setZone("UTC", { keepLocalTime: true })
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

async function isInvalid(req) {
     
     const errors = validationResult(req)
     console.log(errors)

     if(errors.isEmpty()){
          return false;
     }
     else {
          return true;
     }
}

app.get('/', async (req, res) => {
     try {
          res.render("homepage.ejs", await menuRetrieve(req));
     }
     catch (err) {
          console.log(err.message)
          res.render("error.ejs")
     }
})

app.get('/login', async (req, res) => {
     try {
          res.render("login.ejs", await menuRetrieve(req));
     }
     catch (err) {
          res.render("error.ejs")
     }
})

app.get('/add-stuffy', async (req, res) => {
     try {
          res.render("add.ejs", await menuRetrieve(req));
     }
     catch (err) {
          res.render("error.ejs")
     }
})

app.post('add-stuffy', [
     body('name')
          .trim()
          .not().isEmpty(),
     body('animalType')
          .trim()
          .not().isEmpty(),
     body('owner')
          .trim()
          .not().isEmpty(),
     body('image')
          .trim()
          .not().isEmpty()
          .isURL(),
], async(req, res) => {
     if (await isInvalid(req)) {
          return res.send('Invalid Fields')
     }
     if (req.session.canEdit) {
          const originalName = req.params.stuffyName.replace(/_/g, ' ')
          const originalType = req.params.stuffyType.replace(/_/g, ' ')
     }
     else {
          res.send('You are not permitted to edit this page sorry!')
     }
})

app.get("/:stuffyName/:stuffyType", async function (req, res) {
     console.log(req.params.stuffyName)
     console.log(req.params.stuffyType)
     var pageInfo = await menuRetrieve(req)
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
     body('name')
          .trim()
          .not().isEmpty(),
     body('animalType')
          .trim()
          .not().isEmpty(),
     body('owner')
          .trim()
          .not().isEmpty(),
     body('image')
          .trim()
          .not().isEmpty()
          .isURL(),
],async (req, res) => {
     if (await isInvalid(req)) {
          return res.send({msg: 'Invalid Fields'})
     }
     if (req.session.canEdit) {
          var query = 'Update stuffies Set name = $1, animal_type = $2, image = $3, owner = $4, name_origin = $5, origin = $6, other_notes = $7 WHERE name = $8 AND animal_type = $9'
          const originalName = req.params.stuffyName.replace(/_/g, ' ')
          const originalType = req.params.stuffyType.replace(/_/g, ' ')
          var values = [req.body.name, req.body.animalType, req.body.image, req.body.owner, req.body.nameOrigin, req.body.origin, req.body.otherNotes, originalName, originalType]
          await new DatabaseController(process.env.DATABASE_URL).command(query, values)
          const newUrl = "/" + req.body.name.replace(' ', /_/g) + '/' + req.body.animalType.replace(' ', /_/g) + "#active"
          res.send({msg: 'Success', url: newUrl})
     }
     else {
          res.send({msg: 'You are not permitted to edit this page sorry!'})
     }
})

app.post("/login", [
     body("username").not().isEmpty(),
     body("password").not().isEmpty()
], async (req, res) => {
     if (await isInvalid(req)) {
          return res.send('Invalid Fields')
     }
     else if (req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD) {
          req.session.canEdit = true
          return res.send('Success')
     }
     else {
          return res.send('Invalid Username or Password')
     }
})

app.get("/logout", async (req, res) =>{
     req.session.canEdit = false
     res.redirect('/')
})

app.get("*", function (req, res) {
     res.render("error.ejs")
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})