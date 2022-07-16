const users = require('../controllers/user.controller');
const { Router } = require('express');

const router = Router();

router.post('/', users.create);
router.get('/', users.findAll);
router.get('/getUser/:id', users.findOne);
router.put('/update/:id', users.update);
router.delete("/delete/:id", users.deletes);
router.delete("/", users.deleteAll);

module.exports = router;