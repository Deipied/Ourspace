require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const connectionString = "mongodb+srv://user_admin:password1234@cluster0.gv8ba.mongodb.net/?retryWrites=true&w=majority"

let PORT = process.env.PORT || 3000

// LISTEN
app.listen(PORT, function() {
    console.log('listening on ', PORT)
  })

// SET
app.set('view engine', 'ejs')

// USE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

// connection
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('ourspace-posts')
    const postsCollection = db.collection('posts')


  // GET, renders index.ejs 
  app.get('/', function(req, res) {
    db.collection('posts').find().toArray()
      .then(results => {
        res.render('index.ejs', {posts: results})
      })
      .catch(error => console.error(error))
  })

  // POST, SUBMIT BUTTON
  app.post('/posts', (req, res) => {
    postsCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  // PUT, UPDATE EDIT BUTTON
  app.put('/posts', (req, res) => {
    postsCollection.findOneAndUpdate(
      { _id: ObjectId(req.body.id) },
      {
        $set: {
          title: req.body.title,
          thoughts: req.body.thoughts
        }
      },
      {
        upsert: true
      })
      .then(result => {
          res.json('Success')
          })
      .catch(error => console.error(error))
  })

  // DELETE, DELETE BUTTON
  app.delete('/posts', (req, res) => {
    postsCollection.deleteOne(
      { _id: ObjectId(req.body.id) }
    )
    .then(result => {
        res.json(`Deleted the post`)
      })
      .catch(error => {
      console.error(error)})
  })
})
.catch(error => console.error(error))