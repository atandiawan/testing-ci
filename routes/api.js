let express = require('express')
let router = express.Router()
let Article = require("../models/articles.js")

router.get('/articles', function(req,res,next){
  res.render('article.ejs')
})

router.post('/articles', function(req,res,next){
  new Article({title: req.body.title, content: req.body.content}).save(function(err,result){
    if(err){
      console.log(err)
    }
    res.json(result)
  })
})

router.delete('/articles/:id', function(req,res,next){
  Article.remove({_id: req.params.id}, function(err,result){
    if(err){
      console.log(err)
    }
    res.json(result)
  })
})

router.put('/articles/:id', function(req,res,next){
  Article.update({_id: req.params.id},{title: req.body.title, content: req.body.content}, function(err,result){
    if(err){
      console.log(err)
    }
    res.json(result)
  })
})

module.exports = router
