const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('port', (process.env.API_PORT || 8000));
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'doubleb',
  password : 'ukBD3rqcZrSqdQDp',
  database : 'auth_users',

});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/login', function(req, res) {
  const email = req.body.email
  const password = req.body.password
  let response = {};
  res.setHeader('Content-Type', 'application/json');
  /*res.setHeader('Content-Type', 'application/text') */
  connection.query('SELECT password from users WHERE `email` = ?', email , function(err, rows) {
    if (err) throw err;
      if (rows.length > 0) {
        if (password === rows[0].password) {
        response.status = 200;
        response.message = "authenticated";
        response.authenticated = true;
        response.email = email;
      } else {
        response.status = 403;
        response.message = "Login failed!";
        response.authenticated = false;
        response.email = email;
      }
    } else {
      response.status = 403;
      response.message = "Login failed!";
      response.authenticated = false;
      response.email = email;
    }
    res.status(response.status).send(JSON.stringify(response));

  });

});

app.post('/api/registration', function(req, res) {
  var post  = req.body;
  post.ip = req.connection.remoteAddress;
  post.browser = req.headers['user-agent'];
  /*var useragent = req.headers['user-agent']; */
  var ip = req.connection.remoteAddress;
  var query = connection.query('INSERT INTO users SET ?', post, function (error, results, fields) {
    if (error) throw error;
  });
  console.log(query.sql);
  console.log('ip', ip);
});





app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
