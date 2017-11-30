var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs')
var router = express.Router();

//var imgUrl="/home/sanjay/Desktop/21.jpg"

var recipes = require('../server/recipe_schema');

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

/*var imageSchema = new Schema({
    img: { data: Buffer, contentType: String }
});*/
var mongoDB = "mongodb://crazyboy:incorrect@ds245715.mlab.com:45715/crowdsource_recipes";

mongoose.connect(mongoDB);


//var image = mongoose.model('image',imageSchema);

router.get('/myview', function(req, res, next)
{
  findJson = {}
  //console.log(req.method)
  if( req.query.search )
  {
  		s = new RegExp( ".*" + req.query.search + ".*",'i')
  		var objId = SingleObjectId.getInstance() ;
  		findJson = { $or:[ {'_id':objId}, {'title': s},{'author':s},{'ingredients': s},{'procedure': s} ]};

  		//console.log(findJson)
  }


  	recipes.find(findJson,function(err,jsonResp){

  			if(err || jsonResp.length == 0)
        	{
        		res.render('notfound')
        	}
        	else
        	{
            //console.log(jsonResp)
        		res.render('myview',{recipes: jsonResp})
        	}


  		});


});
router.get('/', function(req, res, next)
{
  res.sendFile(path.join(__dirname,"../", 'views','index.html'));
});
router.get('/index', function(req, res, next)
{
  res.sendFile(path.join(__dirname,"../", 'views','index.html'));
});
router.get('/home', function(req, res, next)
{
  res.sendFile(path.join(__dirname,"../", 'views','index.html'));
});
router.get('/contact', function(req, res, next)
{
  res.sendFile(path.join(__dirname,"../", 'views','contact.html'));
});
module.exports = router;
