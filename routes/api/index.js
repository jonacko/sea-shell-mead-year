const router = require('express').Router();
const apiRoutes = require('./routes/api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Error...Wrong route!');
});

module.exports = router;