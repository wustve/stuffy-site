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
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Diana','Dolphin', 'https://cdn.discordapp.com/attachments/515341359771680788/671490636385615938/20200127_180334.jpg','Monica','Named after Monica’s best friend at the time'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Ginger','Bear', 'https://cdn.discordapp.com/attachments/515341359771680788/747530824680996964/IMG_20200824_150029.jpg','Steven','She ginger coloured'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Kawhali','Orca', 'https://cdn.discordapp.com/attachments/515341359771680788/747532141423755325/IMG_20200824_150543.jpg','Steven',"She is kawaii and a whale (sort of)"])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Mr. Rat','Rat', 'https://cdn.discordapp.com/attachments/515341359771680788/747537389026541648/mrrat.jpg','Steven',"Everyone got a little toy from Alsu’s 10th grade birthday party. Steven got Mr. Rat (from Ikea) 2018/06/03"])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Nikola and Jojo','Kangaroo', 'https://cdn.discordapp.com/attachments/515341359771680788/747540403384746074/IMG_20200824_153828.jpg','Steven',"Nikola is named after Australian high jumper Nicola McDermott. Jojo is named after Jojo's Bizarre Adventure"])
          
          
          
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