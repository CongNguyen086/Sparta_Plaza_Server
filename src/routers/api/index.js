var router = require('express').Router();

router.use('/roomtype', require('./roomType'));
router.use('/booking', require('./booking'));
router.use('/payment', require('./paypal'));
router.use('/room', require('./room'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;