var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect("mongodb://crazyboy:incorrect@ds245715.mlab.com:45715/crowdsource_recipes");


var recipeSchema = new Schema({

title:String,
author:String,
imgurl:String,
ingredients:Array,
procedure:String,
likes:Number,
Comments: Array,
images:Array

});

module.exports = mongoose.model('recipe',recipeSchema);
