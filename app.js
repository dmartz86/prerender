var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var http = require('http');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(reqJS, resJS){

  var options = {
    host: 'www.google.com.co',
    port: 80,
    path: '/',
    method: 'GET'
  };

  var data = '';

  var req = http.request(options, function(res) {

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end',function() {
      resJS.render('index/index',
        {
          content: data
        }
      );
    });

  });

  req.on('error', function(e) {
    resJS.render('index/index',
      {
        content: 'Error reading web page'
      }
    );
  });

  req.end();
});

var numUsers = 0;

io.on('connection', function (socket) {
  var snapshot = new Date().getTime();
  socket.snapshot = snapshot;
  numUsers += 1;

  socket.emit('current', {
    numUsers: numUsers
  });

  socket.on('online', function () {
    console.log('on_line::' + socket.snapshot);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    numUsers -= 1;

    console.log('offline::' + socket.snapshot);
  });
});
