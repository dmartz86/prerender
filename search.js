var wget = require('wget');
var uuid = require('uuid');

var search = function(src, cb){
  var id = uuid.v4();
  var output = './public/tmp/' + id + '.html';
  wget.download(src, output)
  .on('error', function(err) {
    try{
      cb(err, false, false);
    }
    catch(e){
      cb('Domain not accessible');
    }
  })
  .on('end', function(o) {
		cb(false, o, id);
  });
};

module.exports = search;
