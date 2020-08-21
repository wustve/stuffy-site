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

}