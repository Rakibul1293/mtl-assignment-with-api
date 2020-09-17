const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');

const UserInfoController = require('../controllers/userInfoController.tsx');
//const userInfoMiddleware = require('../middleware/userInfoMiddleware.tsx');

const mongoURI = 'mongodb+srv://dbUser:YN8cDaSJksn8nro6@tmcluster.wbdpu.mongodb.net/UpdateTechLtdAssignment?retryWrites=true&w=majority';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
console.log(mongoose.connection.readyState);
mongoose.set('debug', true);

const app = express();

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


// Create storage engine
const storage_external = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // const filename = buf.toString('hex') + path.extname(file.originalname);
		const filename = buf.toString('hex') + path.extname(file.originalname);
		console.log(filename);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const storage_internal = multer.diskStorage({
  destination: function(req, file, cb) {
	const dir_path = __dirname;
	console.log("Directory Path: ", dir_path);  
	const path = dir_path.split('\\').slice(0, 6).join('/');
	console.log("Path: ", path);  
	
    cb(null, `${path}/client/public/uploads`);
  },
  filename: function(req, file, cb) {
	// cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
	cb(null, file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload_external = multer({
	storage: storage_external,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
})

const upload_internal = multer({
	storage: storage_internal,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
})



router.get("/", UserInfoController.userInfo_get_all);
router.post("/userInfo", upload_external.single('file'), UserInfoController.userInfo_create);
router.patch("/userInfo/form-update/:id", upload_external.single('file'), UserInfoController.update_userInfo_create);
router.post("/upload_external", upload_external.single('file'), UserInfoController.upload);
router.post("/upload_internal", upload_internal.single('file'), UserInfoController.upload);

router.post("/upload_img_database", upload_external.single('file'), UserInfoController.upload_img_database);

router.get("/files", UserInfoController.get_all_file);
router.get("/files/:filename", UserInfoController.get_single_file);
router.get("/image/:filename", UserInfoController.get_single_img);
router.get("/image_on_browser/:filename", UserInfoController.get_single_img_on_browser);

module.exports = router;
