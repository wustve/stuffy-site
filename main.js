const express = require("express")
const app = express()

require("dotenv").config()

app.get('/', (req, res) => {
     res.send("test!")
})

app.listen(process.env.PORT || 3000, () => {
     console.log("connected to http://localhost:3000")
})