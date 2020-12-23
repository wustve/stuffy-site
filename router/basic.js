// middleware to avoid repetition

const express = require('express')
const { DatabaseController } = require("../database")
const { DateTime } = require('luxon')
const router = express.Router()

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

router.use(async (req, res, next) => {
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

router.get('/', async (req, res) => {
     try {
          let homeResult = res.locals.pageInfo
          res.render("homepage.ejs", homeResult)
     }
     catch (err) {
          console.log(err.message)
          res.render("error.ejs")
     }
})

router.get('/login', async (req, res) => {
     if (res.locals.pageInfo) {
          res.render ("login.ejs", res.locals.pageInfo);
     }
     else {
          res.render("error.ejs")
     }
})

router.get("/:stuffyName/:stuffyType", async function (req, res) {
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

module.exports = router;
