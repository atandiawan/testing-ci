let mongoose = require('mongoose')
mongoose.connect('localhost:27017/test-blog-database')

let articlesSchema = new mongoose.Schema({
  title: String,
  content: String
})

let Articles = mongoose.model('articles', articlesSchema)

module.exports = Articles
