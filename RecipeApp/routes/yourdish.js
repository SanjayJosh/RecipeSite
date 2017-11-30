var express = require('express');
var router = express.Router();
var path = require('path');
router.get('/', function(req, res, next)
{

  res.sendFile(path.join(__dirname,"../", 'views','yourdish.html'));
});
router.post('/queryDish',function(req,res,next)
{
  console.log(req.body.ingredients)
  return res.end("Done")
}
)
module.exports = router;
