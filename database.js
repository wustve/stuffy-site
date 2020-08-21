const { Client } = require("pg")

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
          const client = this.client
          await client.connect()
          try {
               await client.query("CREATE TABLE Stuffies (name varchar(255), animal_type varchar(255), image varchar(255), owner varchar(255), name_origin text, origin text, other_notes text);")
          }
          catch(err){
               console.log(err)
          }
          finally {
               client.end()
          }
     }

     async select(table, values) {
          await client.connect()
          try {
               client.query(text, values)
          }
          catch(err){
               console.log(err)
          }
          finally {
               client.release()
          }
     }
}

exports.DatabaseController = DatabaseController