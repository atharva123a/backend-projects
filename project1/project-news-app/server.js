// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// use the newsAPI key:
const myKey = process.env['KEY']
const newsAPI = require('newsapi');
// create new instance of object:
const newsapi = new newsAPI(myKey);

//use body-parser to parse data from requests:
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));


// timeout function to return if the message timed out:
const TIMEOUT = 10000; // 10seconds:

// enable CORS 
// so that your API is remotely testable 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/news", async(req, res, next)=>{
    let t = setTimeout(()=>{
      next({"message" : "timed out"});
    }, TIMEOUT);

    await newsapi.v2.topHeadlines({
      country : "in",
      language : "en"
    }, (err, data)=>{
      if(err)return console.log(err);

      res.json(data);

    })

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
