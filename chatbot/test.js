var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
  username: '',
  password: '',
  version: 'v1',
  version_date: '2016-07-11'
});

conversation.message({
  input: {text: 'What\'s the weather?'},
  workspace_id: ''
 }, function(err, response) {
     if (err) {
       console.error(err);
     } else {
       console.log(JSON.stringify(response, null, 2));
     }
});
