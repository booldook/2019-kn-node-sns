const express = require('express');
const router = express.Router();
const { Post, HashTag, User } = require('../models');
const { upload } = require('../modules/multer-conn');

router.post("/", upload.single('img'), async (req, res, next) => {
	let { comment } = req.body;
	let img = req.file ? req.file.filename : '';
	let result = await Post.create({
		comment,
		img,
		UserId: req.user.id,
	});
	res.json(result);
});

module.exports = router;