var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next)
{
  var obj;
  fs.readFile(path.join(__dirname,"../","public","data","testfile.json"),
    function(err,jsFile,obj)
    {
        if(err)
        {
            next(err)
        }
        else
        {
          var obj= JSON.parse(jsFile)
          console.log(obj.title)
          res.render('myview', obj);
        }
    }
  )

});

module.exports = router;
