const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());


// ...........................................................................

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pvn5rcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // ...........................................................................

    // const userCollection = client.db('forumDB').collection('users');
    const postsCollection = client.db('forumDB').collection('posts');
    const commentCollection = client.db('forumDB').collection('comments');
    const messageCollection = client.db('forumDB').collection('message');


    // ........................CRUD start..............................
    // get all posts
    app.get('/posts', async (req, res) => {
      const cursor = postsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // insert post
    app.post('/posts', async (req, res) => {
      const post = req.body;
      console.log(post);
      const result = await postsCollection.insertOne(post);
      res.send(result);
    })

    // update
    app.get('/posts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await postsCollection.findOne(query);
      res.send(result);
    })

    // update
    app.put('/posts/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedInfo = req.body;
      const updated = {
        $set: {
          desc: updatedInfo.desc
        }
      }
      const result = await postsCollection.updateOne(filter, updated, options);
      res.send(result);
    })

    // delete
    app.delete('/posts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await postsCollection.deleteOne(query);
      res.send(result);
    })

    // ........................CRUD end..............................
    
    
    
    // ........................comments start..............................

    // insert comment
    app.post('/comment', async (req, res) => {
      const comment = req.body;
      console.log(comment);
      const result = await commentCollection.insertOne(comment);
      res.send(result);
    })

    // get all comments
    app.get('/comment', async (req, res) => {
      const cursor = commentCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    // update
    app.get('/comment/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await commentCollection.findOne(query);
      res.send(result);
    })

     // ........................comments end..............................

    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Forum server is running')
})

app.listen(port, () => {
  console.log(`Forum server is running on port ${port}`)
})



