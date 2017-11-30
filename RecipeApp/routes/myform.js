var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var mongoose = require('mongoose');
var recipes = require('../server/recipe_schema');


var mongoDB = "mongodb://crazyboy:incorrect@ds245715.mlab.com:45715/crowdsource_recipes";


mongoose.connect(mongoDB);



/* GET users listing. */
myfiles= Array();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {

    callback(null, path.join(__dirname,"../", 'public','uploads'));
  },
  filename: function (req, file, callback) {
    //console.log(file)
    callback(null, file.originalname)
    //console.log(file.originalname)
    myfiles.push(file.originalname)
  }
});

var FormUpload = multer({ storage : storage }).array('myPhotos',6);

router.get('/', function(req, res, next)
{

  res.sendFile(path.join(__dirname,"../", 'views','myform.html'));
});


router.post('/uploadForm',FormUpload,function(req,res,next)
{

    var formData = req.body;


    console.log(req.body);

    FormUpload(req,res,
    function(err)
    {
      if(err)
      {
        console.log(err)
        return res.end("Error uploading Image files")
      }
    })

    filename = myfiles[0];

     RecipeObject=
        {
          title:formData.recipeTitle,
          imgurl: "/uploads/" +filename,
          author:formData.recipeAuthor,
          ingredients:formData.ingredients.split(','),
          procedure:formData.procedure,
          likes:0,
          comments:[]
        };

      recipes.create(RecipeObject,function(err,small){
        if(err)
        {
            console.log(err)
            return res.end("Error uploading to mongoDB")
        }

      })

      res.redirect("/");
});


module.exports = router;
