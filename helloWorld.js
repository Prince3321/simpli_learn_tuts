const express = require('express')
const app = express()

app.get('/', function (req, res){
    res.send("Hello World")
})

const server = app.listen(8081,function() {
    const host = server.address().address
    const port = server.address().port
    console.log("Example App Listing at Http://%s:%s",host,port)
})

