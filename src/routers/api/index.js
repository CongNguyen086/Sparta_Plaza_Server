var router = require('express').Router();

router.use('/roomtype', require('./roomType'));
router.use('/booking', require('./booking'));
router.use('/payment', require('./paypal'));
router.use('/room', require('./room'));
router.use('/admin', require('./admin'));
router.use('/staff', require('./staff'));
router.use('/member', require('./member'));
router.use('/promotion', require('./promotion'));
router.use('/review', require('./review'));

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