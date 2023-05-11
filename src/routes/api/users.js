var express = require('express');
var router = express.Router();
const userController = require('../../controller/userController')
const path = require('path')
const authJWT = require('../../midleware/authJWT');
const { verifyRefreshToken } = require('../../midleware/verifyJWT');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({ storage })



router.get('/', authJWT.verifyToken, userController.getAllUser)

router.post('/resgister', userController.resgister)
router.post('/login', userController.login)
router.delete('/:id', authJWT.verifyTokenAdmin, userController.deleteAUser)
router.get('/refreshToken', verifyRefreshToken)

router.post('/single-img', upload.single('avatar'), userController.upLoadSingleImg)
router.post('/multi-img', upload.array('avatar'), userController.upLoadMutiImg)

module.exports = router;
