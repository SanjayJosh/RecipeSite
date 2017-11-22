var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

/* GET home page. */
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

var Schema = mongoose.Schema;

var recipeSchema = new Schema({

title:String,
author:String,
imgurl:String,
ingredients:Array,
procedure:String,
likes:Number,
Comments: Array

});

var mongoDB = "mongodb://crazyboy:incorrect@ds245715.mlab.com:45715/crowdsource_recipes";

mongoose.connect(mongoDB);

var recipes = mongoose.model('recipe',recipeSchema);

router.get('/', function(req, res, next)
{
  /*var obj;
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
  )*/

  recipes.find({},function(err,jsonResp){

        //jsonResp[0].procedure = jsonResp[0].procedure.replaceAll('\r\n','<br><br>').replaceAll('\n','<br><br>');
        res.render('myview',{recipes: jsonResp});

  });

});

module.exports = router;
