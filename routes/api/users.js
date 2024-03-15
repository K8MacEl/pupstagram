const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
const multer = require('multer');
const upload = multer();
/*---------- Public Routes ----------*/

// 'photo' comes from keyName in the Signupage
// on the formData, formData.append('photo', photo)
router.post("/signup", upload.single('photo'),  usersCtrl.signup);
router.post("/login", usersCtrl.login);


router.get('/:username', usersCtrl.profile);
/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/



