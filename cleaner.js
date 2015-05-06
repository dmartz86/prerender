var fs = require('fs');

var cleaner = function(path){
  if(fs.existsSync(path)) {
    fs.readdirSync(path)
    .forEach(function(f) {
      var curPath = path + "/" + f;
      fs.unlink(curPath);
    });
  }
};

module.exports = cleaner;
