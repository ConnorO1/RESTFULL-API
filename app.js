const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

const articleTemplate = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleTemplate);

app.listen(3000, function(){
  console.log("App listening on port 3000");
});


app.route("/articles")

.get(function(req, res){
  Article.find({}, function(err, result){
    if (!err){
      res.send(result);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  });
  article.save(function(err){
    if (!err){
      res.send("Sucess");
    } else {
      res.send(err)
    }
  });
  // note when we do this postman expects a response in return 0 we can do this in the save function itself
  // as shown above
})

.delete(function(req, res){
  Article.deleteMany({}, function(err){
    if (!err){
      res.send("Successfully deleted all articles");
    } else {
      res.send("error");
    }
  })
});

// get should get all articles as per rest architecture
// with post requests - should simply add one article to collection
// dont need to build a front end for this - client can do through somthing like
// postman

// code for getting, deleting, pathching, putting individual articles

app.route("/articles/:title")
.get(function(req, res){
  const title = req.params.title;
  Article.findOne({title: title}, function (err, result){
    if (result) {
      res.send(result);
    } else {
      res.send(err)
    }
  })
})
.put(function(req, res){

  Article.update(
    {title: req.params.title},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err, results){
      if (!err){
        res.send("Successfully updated");
      } else {
        res.send(err);
      }
  });
})
.patch(function(req, res){

// req .body will be an object containing whatever client want to change

  Article.updateOne(
    {title: req.params.title},
    {$set: req.body},
    function(err, result){
      if (!err) {
        res.send("Success");
      } else {
        res.send(err);
      }
  })
})
.delete(function(req, res){
  Article.deleteOne(
    {title: req.params.title},
    function(err){
      if(!err){
        res.send("Deletion successful");
      } else {
        res.send(err);
      }
  })
});
