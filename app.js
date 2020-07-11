let express = require('express');
let path = require('path');
let app = express();

let db = require('./database/db.js');

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = 3000;

app.set('views','./views');

app.use(express.static(__dirname + '/public'));

let homeUrl = '/';

app.get('/quote',function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ a: 1 }, null, 3));
})

app.post('/quote', function (req, res) {

  console.log();
  let quote = req.body.quote;
  if(quote){
    db.insertQuote(quote);
    res.send('OK');
  }else{
    res.send('not OK');
  }

  console.log('POST');
});

app.listen(PORT);
console.log('Homepage running at http://localhost:'+PORT+'/');
