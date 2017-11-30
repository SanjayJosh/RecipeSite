var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var recipes = require('../server/recipe_schema');
var mongoDB = "mongodb://crazyboy:incorrect@ds245715.mlab.com:45715/crowdsource_recipes";
mongoose.connect(mongoDB);
router.get('/:name', function(req, res, next)
{
  name = req.params.name
  console.log('name: ' + name)
  findJson = {}

  s = new RegExp( name )
  //var objId = SingleObjectId.getInstance() ;
  findJson = { 'title': s };

  console.log( ' findJson: '+ JSON.stringify(findJson));


  recipes.find(findJson,function(err,jsonResp){

  if(err || jsonResp.length == 0)
  {
  	res.render('notfound')
  }
  else
  {
      // console.log(jsonResp)
      //res.render('singleRecipe',jsonResp[0])
      res.render('myview',{recipes: jsonResp})
  }


  });


});
module.exports = router;
