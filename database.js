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
               //await this.client.query("DELETE FROM stuffies WHERE name = 'Canuck '")

               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,origin, other_notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',['Angela','Bear', 'https://cdn.discordapp.com/attachments/515341359771680788/743319781771313242/20200813_000648.jpg','Monica', 'From Build-A-Bear in Square One', 'Has little sewn in heart button that plays heart beat when pressed'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner) VALUES ($1,$2,$3,$4) RETURNING *',['Blossom','Dog', 'https://cdn.discordapp.com/attachments/515341359771680788/736389714168512643/JPEG_20200724_210934.jpg','Monica'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin,origin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',['Blanchette','Bear', 'https://cdn.discordapp.com/attachments/515339628115394570/652571170884812820/IMG_20191206_130437.jpg','Steven','She white and Blanchette is like blanche but its a name','From Miniso in Erin Mills Town Centre on 2019/12/06'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin,other_notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',['Canuck','Bear', 'https://cdn.discordapp.com/attachments/515341359771680788/747223388975530024/IMG_20200823_183853.jpg','Steven','We searched for famous polar bear names and found Knut, a polar bear who lived at the Berlin Zoo. Changed it to Canuck so it was more Canadian.','Underwent surgery to seal crotch and arm wounds'])
          
          
          
          
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