// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", (req, res) => {
  let date = new Date(req.params.date);
  if (req.params.date == null){
    const now = new Date();
    const unixNow = Math.floor(now.getTime());
    const utcNow = now.toUTCString();
    res.json({unix: unixNow, utc:utcNow});
  }
  if (date.toString() === "Invalid Date"){
    date = new Date(parseInt(req.params.date))
  }
  if (isNaN(date)){
    res.json({error: "Invalid Date"})
  }
  
  const unixTimestamp = Math.floor(date.getTime());
  const utcString = date.toUTCString();
  res.json({unix: unixTimestamp, utc: utcString});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
