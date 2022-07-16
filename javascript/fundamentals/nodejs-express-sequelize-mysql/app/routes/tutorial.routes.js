const tutorials = require('../controllers/tutorial.controller');
const { Router } = require('express');

const router = Router();

router.post('/', tutorials.create);
router.get('/', tutorials.findAll);
router.get('/published', tutorials.findAllPublished);
router.get('/:id', tutorials.findOne);
router.put('/:id', tutorials.update);
router.delete("/:id", tutorials.delete);
router.delete("/", tutorials.deleteAll);

module.exports = router;