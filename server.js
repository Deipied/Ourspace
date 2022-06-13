const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


// LISTEN
app.listen(3000, function() {
    console.log('listening on 3000')
  })

// SET
app.set('view engine', 'ejs')

// USE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))


MongoClient.connect("mongodb+srv://user_admin:password@cluster0.gv8ba.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('ourspace-posts')
    const postsCollection = db.collection('posts')


  // GET, renders index.ejs with
  app.get('/', function(req, res) {
    db.collection('posts').find().toArray()
      .then(results => {
        res.render('index.ejs', {posts: results})
      })
      .catch(error => console.error(error))
  })

  // // POST, 
  // app.post('/posts', (req, res) => {
  //   postsCollection.insertOne(req.body)
  //     .then(result => {
  //       res.redirect('/')
  //     })
  //     .catch(error => console.error(error))
  // })

  // // PUT, UPDATE EDIT BUTTON
  // app.put('/posts', (req, res) => {
  //   postsCollection.findOneAndUpdate(
  //     { how to find }, //{ name: 'yoda' }
  //     {
  //       $set: {
  //         proper2: req.body.proper2,
  //         proper2: req.body.proper2
  //       }
  //     },
  //     {
  //       upsert: true
  //     })
  //     .then(result => {
  //         res.json('Success')
  //         })
  //     .catch(error => console.error(error))
  // })

  // // DELETE, DELETE BUTTON
  // app.delete('/posts', (req, res) => {
  //   postsCollection.deleteOne(
  //     { name: req.body.name }
  //   )
  //   .then(result => {
  //       // if (result.deletedCount === 0) {
  //       //   return res.json('No quote to delete')
  //       // }
  //       res.json(`Deleted the post`)
  //     })
  //     .catch(error => console.error(error))
  // })
})
.catch(error => console.error(error))