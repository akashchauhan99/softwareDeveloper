const { Router } = require('express');

const tutorialRoutes = require('./tutorial.routes');

const userRoutes = require('./user.routes');

const router = Router();

router.use('/user', userRoutes);

router.use('/tutorial', tutorialRoutes);

module.exports = router;
