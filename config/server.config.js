if(process.env.NODE != "Production"){
    require('dotenv').config()
}


module.exports ={
   PORT :  process.env.PORT
}