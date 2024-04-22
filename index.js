const express = require('express');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT||3000;
// middleware
app.use(cors())
app.use(express.json())

// mongodb


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ngsjczb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();



    const coffeCollection = client.db("coffeDB").collection("coffeInfo") ;

    app.get('/coffe', async(req,res)=>{

      const cursor = coffeCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    
    app.get('/coffe/:id', async(req, res)=>{

      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result =await coffeCollection.findOne(query)
      res.send(result)
    })

    app.put('/coffe/:id', async(req, res)=>{

      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const coffeData = req.body;
      const options = { upsert: true };
      console.log(coffeData);

      const updateCoffeDatas = {
        $set:{
name: coffeData.name,
 cheif: coffeData.cheif,
  supplier: coffeData.supplier,
   taste : coffeData.taste,
   catagory: coffeData.catagory,
    price : coffeData.price,
    photo : coffeData.photo



        }
      }


      const result = await coffeCollection.updateOne(filter,updateCoffeDatas, options)
      res.send(result)
    })


    app.post('/coffe', async(req, res)=>{

      const coffeData = req.body;
      console.log(coffeData);
      const result = await coffeCollection.insertOne(coffeData);
      res.send(result)
    })

   


    
    app.delete('/coffe/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await coffeCollection.deleteOne(query)
      res.send(result)
    })

    // Send a ping to confirm a successful connection


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// mongodb
app.get('/', (req, res)=>{

res.send('coffe server ready to work')


})


app.listen(port,()=>{

    console.log(`server ready ${port}`);
})

// o1IUw3COg3SWnfWy
// coffeUser
