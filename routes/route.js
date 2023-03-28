const { createUser,getAllUsers,getUserById,userUpdate,userDelete, getAuth } = require('../controllers/IndexController.js');
const express = require('express');
const router = express.Router();
const { checkToken } = require('../middleware/auth.js')
router.post('/user',createUser);
router.get('/user',checkToken,getAllUsers);
router.get('/user/:id',checkToken,getUserById);
router.patch('/user',checkToken,userUpdate);
router.delete('/user/:id',checkToken,userDelete);
router.post('/user/login',getAuth);

module.exports ={router};




// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/IndexController');
// //const pool = require('../database');

// router.get('/user',res.send(controller.IndexController.user));
// router.get('/user/:id',controller.IndexController.user_id);

// module.exports.router = router;