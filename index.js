let express = require('express')
let app = express()
let router = express.Router()
let api = require('./routes/api.js')
let bodyParser = require('body-parser')
app.use(bodyParser())
app.set('view-engine','ejs')

app.use('/api', api)

app.listen(3000, function(){
  console.log('listening on 3000')
})
