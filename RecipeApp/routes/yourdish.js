var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

var recipes = require('../server/recipe_schema');
var ObjectId = mongoose.Types.ObjectId;


mongoose.connect("mongodb://crazyboy:incorrect@ds245715.mlab.com:45715/crowdsource_recipes");


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

router.get('/', function(req, res, next)
{

  res.sendFile(path.join(__dirname,"../", 'views','yourdish.html'));
});
router.post('/queryDish',function(req,res,next)
{
  //console.log(req.body.ingredients)


  query = Array();

  ingredients = req.body.ingredients;

  if( ingredients)
  {

  		var objId = SingleObjectId.getInstance() ;

  		var l = ingredients.length;
  		for(var i=0;i<l;i++)
  		{
        var myjson={$regex:ingredients[i]}
  			query.push({'ingredients': myjson })
        //query.push({'ingredients': ingredients[i]})
  		}

  		//query.push({'_id':objId})
      console.log(query)
  		findJson = {$and:query}

  		console.log(findJson)
  }


  	recipes.find(findJson,function(err,jsonResp){

  			if(err || jsonResp.length == 0)
        	{
        		res.render('notfound')
        	}
        	else
        	{
            console.log(jsonResp.length)
        		res.render('myview',{recipes: jsonResp})
        	}


  		});

}
)
module.exports = router;
