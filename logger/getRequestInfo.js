module.exports = function(req, res, next){
  console.log('test function called.');
  next();
}
