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
               await this.client.query("CREATE TABLE Stuffies (name varchar(255), animal_type varchar(255), image varchar(255), owner varchar(255), name_origin text, origin text, other_notes text);")
          }
          catch(err){
               console.log(err)
          }
          finally {
               this.client.end()
          }
     }

     async select(table, values) {
          await this.client.connect()
          try {
               this.client.query(text, values)
          }
          catch(err){
               console.log(err)
          }
          finally {
               this.client.end()
          }
     }
}

exports.DatabaseController = DatabaseController