var express = require('express');
var app = express();
console.log(process.env.IBM_USER);
// IBM Watson
var watson = require('watson-developer-cloud');
var conversation = watson.conversation({
  username: process.env.IBM_USER,
  password: process.env.IBM_PASS,
  version: 'v1',
  version_date: '2016-07-11'
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/map', function(request, response) {
  response.render('pages/map');
});

app.get('/bot', function(request, response) {
  var query = request.query.q;

  conversation.message({
      input: {text: query},
      workspace_id: process.env.WORKSPACE_ID
    }, function(err, res) {
      if (err) {
        return next(err);
      } else {
        //console.log(JSON.stringify(response, null, 2));
        response.json(res);
      }
    }
  );
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


