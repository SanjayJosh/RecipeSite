var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var router = express.Router();



String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


//Every user searches with the same ObjectId instead of different Ids for efficiency
//Singleton Pattern
var SingleObjectId = (function () {
    var instance;
 
    function createInstance() {
        var object = new ObjectId( "123456789012"  );
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();




var ObjectId = mongoose.Types.ObjectId;

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
  findJson = {}
  console.log(req.method)
  if( req.query.search )
  {
  		s = new RegExp( ".*" + req.query.search + ".*",'i')
  		var objId = SingleObjectId.getInstance() ;
  		findJson = { $or:[ {'_id':objId}, {'title': s},{'author':s},{'ingredients': s},{'procedure': s} ]};
  		
  		console.log(findJson) 
  }


  	recipes.find(findJson,function(err,jsonResp){

  			if(err || jsonResp.length == 0)
        	{
        		res.render('notfound')
        	}
        	else
        	{
        		res.render('myview',{recipes: jsonResp})	
        	}
        	

  		});
  

});

module.exports = router;
