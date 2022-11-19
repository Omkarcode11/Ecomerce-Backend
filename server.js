const bodyParser = require('body-parser')
let express = require('express')
let app = express()
let config = require('./config/server.config')
let route = require('./Route/index')
app.use(bodyParser.json())
app.use(route)

app.listen(config.PORT,()=>{
    console.log("Server is up and running on port 8888")
})