// Setup basic express server
var fs = require('fs');
var express = require('express');
var sh = require('sanitize-html');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var search = require('./search');
var cleaner = require('./cleaner');

cleaner('./public/tmp');
cleaner('./public/templates');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  search('http://www.lofty.com/about-lofty', function(err, file, id){
    if(!file && !id){
      if(err){
        socket.emit('message', {
          error: err
        });
      }
      return;
    }

    var f = fs.createReadStream(file, {});
    var data = '';
    f.on('data', function(chunk) {
      data += chunk;
    })
    .on('end', function() {
      var cheerio = require('cheerio');
      var c = cheerio.load(data);
      res.render('index/index',
        {
          content: c('body').html()
        }
      );
    })
    .on('error', function(err) {
      socket.emit('message', {
        error: err
      });
    });
  });

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

  socket.on('search', function (website) {

    try{

    }
    catch(e){
      socket.emit('message', {
        error: e
      });
    }

  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    numUsers -= 1;

    console.log('offline::' + socket.snapshot);
  });
});
