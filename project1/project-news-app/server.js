// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const myKey = process.env['KEY']
//use body-parser to parse data from requests:
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

// enable CORS 
// so that your API is remotely testable 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.post("/api/hello", (req, res)=>{
    let s = req.body;
    console.log(s)
    res.json("hi")
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
