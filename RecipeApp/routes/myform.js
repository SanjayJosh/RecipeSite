var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer')
/* GET users listing. */
myfiles= Array();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {

    callback(null, path.join(__dirname,"../", 'public','uploads'));
  },
  filename: function (req, file, callback) {
    //console.log(file)
    callback(null, file.originalname)
    console.log(file.originalname)
    myfiles.push(file.originalname)
  }
});
var upload = multer({ storage : storage }).array('myPhotos',6);
router.get('/', function(req, res, next)
{

  res.sendFile(path.join(__dirname,"../", 'views','myform.html'));
});
router.post('/uploadPicture',upload,function(req,res,next)
{
  console.log(req.body)
  upload(req,res,
    function(err)
    {
      if(err)
      {
        console.log(err)
        return res.end("Error uploading File")
      }
      res.end("Files uploaded successfully")
    })
    console.log(myfiles)
});

module.exports = router;
