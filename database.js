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
               //await this.client.query("DELETE FROM stuffies WHERE name = 'Penny'")
               //await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/515341359771680788/749109483955028109/giner.jpg' WHERE name = 'Ginger'")

               /*
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/515341359771680788/747641204577009754/blanchette.jpg' WHERE name = 'Blanchette'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747642948140925058/angela.jpg' WHERE name = 'Angela'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747643607737040896/blossom.jpg' WHERE name = 'Blossom'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747643624807858216/chip.jpg' WHERE name = 'Chip'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747643896854609930/diana.jpg' WHERE name = 'Diana'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747648088641896578/dozer.jpg' WHERE name = 'Dozer'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747648121189826631/eeyore.jpg' WHERE name = 'Eeyore'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747648185266208898/elizbeth.jpg' WHERE name = 'Elizabeth'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747648205511983205/hannah_cat.jpg' WHERE name = 'Hannah' AND animal_type = 'Cat'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747648227058253894/hanna_bear.jpg' WHERE name = 'Hannah' AND animal_type = 'Bear'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747648245869576202/happy_feet.jpg' WHERE name = 'Happy Feet'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747648259899523172/jane_doe.jpg' WHERE name = 'Jane Doe'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747648273367433357/canuck.jpg' WHERE name = 'Canuck'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/515341359771680788/749109483955028109/giner.jpg' WHERE name = 'Ginger'")


               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651356889841754/kawhali.jpg' WHERE name = 'Kawhali'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651370995286016/goose.jpg' WHERE name = 'Mr. Goose'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651387688747038/mrrat.jpg' WHERE name = 'Mr. Rat'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651401592864808/stingray.jpg' WHERE name = 'Mr. Stingray'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651416239112282/nikola.jpg' WHERE name = 'Nikola and Jojo'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651541929820170/wolfy.jpg' WHERE name = 'Wolfy'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651544471830579/wilbur.jpg' WHERE name = 'Wilbur'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651545729859615/theo.jpg' WHERE name = 'Theodore Roosevelt'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651547109916772/strawberry.jpg' WHERE name = 'Strawberry'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651549207068782/sparky.jpg' WHERE name = 'Sparky'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651550419091466/snorlax.jpg' WHERE name = 'Snorlax'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651552352665691/sippy.png' WHERE name = 'Sippy'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651552558186556/rosie.jpg' WHERE name = 'Rosie'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651554198159501/private.jpg' WHERE name = 'Private'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651862513057912/owen.jpg' WHERE name = 'Owen'")
               await this.client.query("UPDATE stuffies SET image = 'https://cdn.discordapp.com/attachments/630912200491532290/747651866086867094/oswald.jpg' WHERE name = 'Oswald'")
               */
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,origin, other_notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',['Angela','Bear', 'https://cdn.discordapp.com/attachments/515341359771680788/743319781771313242/20200813_000648.jpg','Monica', 'From Build-A-Bear in Square One', 'Has little sewn in heart button that plays heart beat when pressed'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner) VALUES ($1,$2,$3,$4) RETURNING *',['Blossom','Dog', 'https://cdn.discordapp.com/attachments/515341359771680788/736389714168512643/JPEG_20200724_210934.jpg','Monica'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin,origin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',['Blanchette','Bear', 'https://cdn.discordapp.com/attachments/515339628115394570/652571170884812820/IMG_20191206_130437.jpg','Steven','She white and Blanchette is like blanche but its a name','From Miniso in Erin Mills Town Centre on 2019/12/06'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin,other_notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',['Canuck','Bear', 'https://cdn.discordapp.com/attachments/515341359771680788/747223388975530024/IMG_20200823_183853.jpg','Steven','We searched for famous polar bear names and found Knut, a polar bear who lived at the Berlin Zoo. Changed it to Canuck so it was more Canadian.','Underwent surgery to seal crotch and arm wounds'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Diana','Dolphin', 'https://cdn.discordapp.com/attachments/515341359771680788/671490636385615938/20200127_180334.jpg','Monica','Named after Monica’s best friend at the time'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Ginger','Bear', 'https://cdn.discordapp.com/attachments/515341359771680788/747530824680996964/IMG_20200824_150029.jpg','Steven','She ginger coloured'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Kawhali','Orca', 'https://cdn.discordapp.com/attachments/515341359771680788/747532141423755325/IMG_20200824_150543.jpg','Steven',"She is kawaii and a whale (sort of)"])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Mr. Rat','Rat', 'https://cdn.discordapp.com/attachments/515341359771680788/747537389026541648/mrrat.jpg','Steven',"Everyone got a little toy from Alsu’s 10th grade birthday party. Steven got Mr. Rat (from Ikea) 2018/06/03"])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Nikola and Jojo','Kangaroo', 'https://cdn.discordapp.com/attachments/515341359771680788/747540403384746074/IMG_20200824_153828.jpg','Steven',"Nikola is named after Australian high jumper Nicola McDermott. Jojo is named after Jojo's Bizarre Adventure"])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Nikola and Jojo','Kangaroo', 'https://cdn.discordapp.com/attachments/515341359771680788/747540403384746074/IMG_20200824_153828.jpg','Steven',"Nikola is named after Australian high jumper Nicola McDermott. Jojo is named after Jojo's Bizarre Adventure"])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Oswald','Dog', 'https://cdn.discordapp.com/attachments/515341359771680788/747543561641263115/IMG_20200824_155107.jpg','Steven',"Allegedly from No Frills when Steven was 10 months old. He was bought to replace a teddy bear Steven dropped while being carried for a walk. Someone else with a stroller just took it and said it was theirs."])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin,origin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',['Penny','Deer', 'https://cdn.discordapp.com/attachments/515339628115394570/601104921441468436/IMG_20190717_094806.jpg','Steven',"She was purchased from Penn’s Cave",'She was purchased from Penn’s Cave on 2019/07/17 during Steven’s trip to America'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Sippy','Lion', 'https://cdn.discordapp.com/attachments/711362045139746862/743137433796870255/IMG_20200812_115526.png','Steven',"Named after a female TF2 player we encountered"])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Snorlax','Snorlax', 'https://cdn.discordapp.com/attachments/515341359771680788/747565857701494877/IMG_20200824_171939.jpg','Steven',"Yebin got it as a gift for me when she was visiting from Korea in Grade 10 (early in the school year)."])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,origin,other_notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',['Spots','Dog', 'https://cdn.discordapp.com/attachments/515341359771680788/747567748120444928/IMG_20200808_001407.jpg','Steven',"From Steven’s trip to Disney World in the summer after grade 3 (?)",'Is a 101 Dalmatians dog'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,name_origin,origin,other_notes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',['Theodore Roosevelt','Mouse', 'https://cdn.discordapp.com/attachments/515339628115394570/600025406871044365/IMG_20190714_135640.jpg','Steven',"Purchased in US and he looks like a (teddy) bear, so we picked American President Roosevelt since his nickname was Teddy",'He was purchased from at a truck stop on 2019/07/14 during Steven’s trip to America','He was born with the inner fabric of one of his ears not sewn in, so he underwent surgery'])
               //await this.client.query('INSERT INTO stuffies (name, animal_type,image,owner,origin) VALUES ($1,$2,$3,$4,$5) RETURNING *',['Wolfy','Wolf', 'https://cdn.discordapp.com/attachments/515341359771680788/747569603546316850/IMG_20200809_202900.jpg','Steven',"Purchased from Great Wolf Lodge in the summer before 6th grade(?)"])
          
          
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