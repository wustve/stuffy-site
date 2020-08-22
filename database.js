const { Client } = require("pg") // const Client = require('pg').Client

class DatabaseController {
    
     constructor(dbURL) {
          this.client = new Client({
               connectionString : dbURL,
               ssl: {
                    rejectUnauthorized: false
               }
          });
     }

     async create() {
          await this.client.connect()

          try {
               //await this.client.query("CREATE TABLE Stuffies (name varchar(255), animal_type varchar(255), image varchar(255), owner varchar(255), name_origin text, origin text, other_notes text);")
               //this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Angela','Bear', 'https://cdn.discordapp.com/attachments/515341359771680788/743319781771313242/20200813_000648.jpg','Monica', 'From Build-A-Bear in Square One'])
               await this.client.query('SELECT * FROM stuffies')
          }
          catch(err){
               console.log(err)
          }
          finally {
               this.client.end()
          }
     }

     async select(name = null) {
          await this.client.connect()
          try {
               const response = await this.client.query('Select * FROM stuffies')
               await this.client.end()
               return response
          }
          catch(err){
               console.log(err)
               return false
          }
     }

     async command(queryText, values = null) {
          await this.client.connect()
          try {
               const response = await this.client.query(queryText, values)
               this.client.end()
               return response
          }
          catch(err) {
               console.log(err)
          }
          finally {
               this.client.end()
          }
     }
}

exports.DatabaseController = DatabaseController