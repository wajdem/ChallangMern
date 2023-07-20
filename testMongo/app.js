const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

const app = express();
app.use(express.json())

let db;
connectToDb((err) => {
  if (!err) {
    app.listen(8686, () => {
      console.log("app listen on part 8686");
    });
    db = getDb();
  }
});

app.get("/users", (req, res) => {


  let users = [];

  db.collection("tackOne")
    .find()
    .sort({ name: 1 })
    .forEach((user) => users.push(user))
    .then(() => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/users/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("tackOne")
      .findOne({ _id: new ObjectId(req.params.id) }) // Use the new keyword here
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the documents" });
      })
  }else{
    res.status(500).json({error: "Not a valid doc id"})
  }
});


app.post('/users' , (req, res) => {
  const user = req.body

  db.collection('tackOne')
  .insertOne(user)
  .then(result => {
    res.status(201).json(result)
  })
  .catch(err => {
    res.status(500).json({err: 'could not create a new document'})
  })
})

app.delete('/users/:id', (req,res) =>{
    if (ObjectId.isValid(req.params.id)) {
        db.collection("tackOne")
          .deleteOne({ _id: new ObjectId(req.params.id) }) // Use the new keyword here
          .then(result => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(500).json({ error: "Could not delete the documents" });
          })
      }else{
        res.status(500).json({error: "Not a valid doc id"})
      }

})


app.patch('/users/:id', (req, res) => {
    const updates = req.body;
  
    if (ObjectId.isValid(req.params.id)) {
      db.collection("tackOne")
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
        .then(result => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json({ error: "Could not update the document" });
        });
    } else {
      res.status(500).json({ error: "Not a valid doc id" });
    }
  });