const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/routes', apiRoutes);

router.use((req, res) => {
  return res.send('Error...Wrong route!');
});

module.exports = router;