const router = require('express').Router();
const controller = require('../../controllers/userController');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../../middleware/jwt');

router.get('/', verifyTokenAndAdmin, controller.getAll);

//
router.get('/find/:id', verifyTokenAndAdmin, controller.getSingle);

router.get('/stats', verifyTokenAndAdmin, controller.getStats);

router.put('/:id', verifyTokenAndAuthorization, controller.getStats);

router.delete('/:id', verifyTokenAndAuthorization, controller.getStats);


module.exports = router;