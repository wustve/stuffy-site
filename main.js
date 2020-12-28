const express = require("express")
const app = express()
const ejs = require('ejs')
const { DatabaseController } = require("./database")
var { DateTime } = require('luxon')
const { body, validationResult } = require('express-validator')
const session = require('express-session')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const invalidPermissions = 'You are not permitted to edit, sorry!'

require("dotenv").config()

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.use(session({
     secret: process.env.SECRET,
     resave: true,
     samesite: 'lax',
     saveUninitialized: false
}))

//new DatabaseController(process.env.DATABASE_URL).command("UPDATE anchordates SET date = '2020-12-27' WHERE person = 'Monica'")



async function menuRetrieve(req) {
     try {
          var menuResult = await new DatabaseController(process.env.DATABASE_URL).menuResult()
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
     var anchorDateSteven = await getDate("Steven")
     var anchorDateMonica = await getDate("Monica")
     let currentDate = getCurrentDate()
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


async function getDate(name) {
     const anchorDate = await new DatabaseController(process.env.DATABASE_URL).command('Select date FROM AnchorDates WHERE person = $1;', [name])
     return DateTime.fromJSDate(anchorDate.rows[0].date, { zone: 'UTC' })
}

function getCurrentDate() {
     var currentDate = DateTime.local().setZone("America/Toronto")
     currentDate = currentDate.setZone("UTC", { keepLocalTime: true })
     return currentDate
}


async function manipulateDatabase(req, res, update) {
     if (await isInvalid(req)) {
          return res.send({ msg: 'Invalid Fields' })
     }

     if (req.session.canEdit) {

          if (update) {
               const originalName = req.params.stuffyName.replace(/_/g, ' ')
               const originalType = req.params.stuffyType.replace(/_/g, ' ')

               if ((originalName == req.body.name && originalType == req.body.animalType) || !(await alreadyExists(req.body.name, req.body.animalType))) {
                    var query = 'UPDATE stuffies SET name = $1, animal_type = $2, image = $3, owner = $4, name_origin = $5, origin = $6, other_notes = $7 WHERE name = $8 AND animal_type = $9'
                    var values = [req.body.name, req.body.animalType, req.body.image, req.body.owner, req.body.nameOrigin, req.body.origin, req.body.otherNotes, originalName, originalType]
                    await new DatabaseController(process.env.DATABASE_URL).command(query, values)
               } else {
                    return res.send({ msg: "Another stuffy of the same name already exists!" })
               }
          }
          else if (!(await alreadyExists(req.body.name, req.body.animalType))) {
               var sotD = await currentSotD(req.body.owner)

               var query = 'INSERT INTO stuffies (name, animal_type, image, owner, name_origin, origin, other_notes) VALUES ($1, $2, $3, $4, $5, $6, $7)'
               var values = [req.body.name, req.body.animalType, req.body.image, req.body.owner, req.body.nameOrigin, req.body.origin, req.body.otherNotes]
               await new DatabaseController(process.env.DATABASE_URL).command(query, values)
               await keepStuffyofTheDay(sotD.name, sotD.animal_type, req.body.owner)
          } else {
               return res.send({ msg: "This stuffy already exists!" })
          }


          const newUrl = "/" + req.body.name.replace(/ /g, '_') + '/' + req.body.animalType.replace(/ /g, '_') + "#active"
          res.send({ msg: 'Success', url: newUrl })
     }
     else {
          res.send({ msg: invalidPermissions })
     }
}


async function currentSotD(owner) {
     const stuffies = await new DatabaseController(process.env.DATABASE_URL).menuResult()
     let stevenStuffy, monicaStuffy
     [stevenStuffy, monicaStuffy] = await stuffyOfTheDay(stuffies)
     var stuffyName, stuffyType
     console.log(owner)
     if (owner == "Steven") {
          stuffyName = stevenStuffy.name
          stuffyType = stevenStuffy.animal_type
     } else if (owner == "Monica") {
          stuffyName = monicaStuffy.name
          stuffyType = monicaStuffy.animal_type
     }
     return {name: stuffyName, animal_type: stuffyType}
}



async function alreadyExists(stuffyName, type) {
     const existing = await new DatabaseController(process.env.DATABASE_URL).command('SELECT name, animal_type FROM stuffies')
     return (existing.rows.some(entry => (entry.name == stuffyName && entry.animal_type == type)))
}

async function isInvalid(req) {

     const errors = validationResult(req)

     if (errors.isEmpty()) {
          return false;
     }
     else {
          return true;
     }
}

async function keepStuffyofTheDay(sotdName, sotdType, owner, additionalOffset = 0) {
     if (owner !== "Steven" && owner !== "Monica") {
          return
     }
     const stuffies = await new DatabaseController(process.env.DATABASE_URL).command("SELECT name, animal_type FROM stuffies WHERE owner = $1 ORDER BY name, animal_type ASC;", [owner])
     const offset = stuffies.rows.findIndex(stuffy => (stuffy.name == sotdName && stuffy.animal_type == sotdType)) + additionalOffset

     console.log(stuffies)
     console.log (sotdName)
     console.log(sotdType)
     console.log(offset)
     console.log(owner)


     var today = getCurrentDate()
     var anchor = today.minus({ days: offset })
     anchor = anchor.toISODate()
     console.log(anchor)
     console.log(await new DatabaseController(process.env.DATABASE_URL).command("UPDATE anchordates SET date = $1 WHERE person = $2;", [anchor, owner]))
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
          var pageInfo = await menuRetrieve(req)
          pageInfo.article = false;
          res.render("add.ejs", pageInfo);
     }
     catch (err) {
          res.render("error.ejs")
     }
})

app.post('/add-stuffy', [
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
], async (req, res) => {
     await manipulateDatabase(req, res, false)
})

app.get("/:stuffyName/:stuffyType", async function (req, res) {

     var pageInfo = await menuRetrieve(req)
     var dbResult = await new DatabaseController(process.env.DATABASE_URL).command("SELECT * FROM stuffies WHERE name = $1 AND animal_type = $2", [req.params.stuffyName.replace(/_/g, ' '), req.params.stuffyType.replace(/_/g, ' ')])
     if (dbResult.rowCount > 0) {
          pageInfo.selectedStuffy = dbResult.rows[0]
          pageInfo.article = true
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
], async (req, res) => {
     await manipulateDatabase(req, res, true)
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

app.get("/logout", async (req, res) => {
     req.session.canEdit = false
     res.redirect('/')
})

app.delete("/:stuffyName/:animalType", async (req, res) => {
     if (req.session.canEdit) {
          const values = [req.params.stuffyName.replace(/_/g, ' '), req.params.animalType.replace(/_/g, ' ')]
          
          const stuffies = await new DatabaseController(process.env.DATABASE_URL).menuResult()
          const owner = stuffies.rows.find(stuffy => (stuffy.name == req.params.stuffyName && stuffy.animal_type == req.params.animalType)).owner
          const sotD = await currentSotD(owner)
          console.log(sotD)

          await new DatabaseController(process.env.DATABASE_URL).command("DELETE from stuffies where name = $1 AND animal_type = $2", values)
          
          if (sotD.name == req.params.stuffyName && sotD.animal_type == req.params.animalType){
               await keepStuffyofTheDay(sotD.name, sotD.animal_type, owner, 1)
          } else {
               await keepStuffyofTheDay(sotD.name, sotD.animal_type, owner)
          }


          res.send("Success")
     } else {
          res.send(invalidPermissions)
     }
})

app.get("*", function (req, res) {
     res.render("error.ejs")
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})