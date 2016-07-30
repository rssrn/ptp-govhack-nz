var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
  username: '<username>',
  password: '<password>',
  version: 'v1',
  version_date: '2016-07-01'
});

conversation.message({
  input: 'What\'s the weather?',
  workspace_id: '<workspace id>'
 }, function(err, response) {
     if (err) {
       console.error(err);
     } else {
       console.log(JSON.stringify(response, null, 2));
     }
});
