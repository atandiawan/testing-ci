let mongoose = require('mongoose')
let chai = require('chai')
let expect = chai.expect
let controller = require('../../controller/index.js')
let http = require('http')
let chaiHttp = require('chai-http')
let Article = require('../../models/articles.js')


chai.use(chaiHttp)

let getArticleByTitle = function(title,callback){
  Article.findOne({title: title}, function(err,result){
    if(err){
      console.log(err)
    }
    callback(result)
  })
}

let getArticleById = function(id,callback){
  Article.findOne({_id: id}, function(err,result){
    if(err){
      console.log(err)
    }
    callback(result)
  })
}

describe('api new article - check if new article is successfully saved', function(){
  it('database should have the data after it is saved', function(){
    let title = "testing kambing"
    let content = "mari belajar testing yuk"
    chai.request('http://localhost:3000').post('/api/articles').send({title:title, content:content}).end(function(err){
      Article.findOne({"title": title}, function(err2,result){
        if(err2){
          console.log(err2)
        }
        expect(result.title).to.be.equal(title)
        expect(result.content).to.be.equal(content)
      })
    })
  })
})

describe('api delete article - check if deleted article is deleted', function(){
  it('database should not have the title of article that has been deleted', function(){
    console.log('masuk')
    let title = "testing yuk"
    let content = "mari belajar testing yuk yuk"
    chai.request('http://localhost:3000').post('/api/articles').send({title:title, content:content}).end(function(err1,result1){
      Article.findOne({"title": title}, function(err2,result2){
        chai.request('http://localhost:3000').delete(`/api/articles/${result2._id}`).end(function(err,result3){
          Article.find({_id: result2._id}, function(err4,result4){
            console.log("----", result4)
            expect(result4).to.be.empty
          })
        })
      })
    })
  })
})

describe('api update article - check if new article is successfully saved', function(){
  it('database should have the data after it is saved', function(){
    let title = "testing ubah article"
    let content = "mari belajar testing ubah yuk"
    let title_updated = "terubah"
    let content_updated = "terubah juga"
    chai.request('http://localhost:3000').post('/api/articles').send({title:title, content:content}).end(function(err1,result1){
      Article.findOne({"title": title}, function(err2,result2){
        if(err2){
          console.log(err2)
        }
        chai.request(`http://localhost:3000`).put(`/api/articles/${result2._id}`).send({title: title_updated, content: content_updated}).end(function(err,res){
          if(err){
            console.log(err)
          }
          getArticleById(result2._id, function(result){
            expect(result.title).to.be.equal(title_updated)
            expect(result.content).to.be.equal(content_updated)
          })
        })
      })
    })
  })
})
