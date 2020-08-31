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