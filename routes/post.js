const express = require('express');
const router = express.Router();
const { Post, HashTag, User } = require('../models');
const { upload } = require('../modules/multer-conn');

router.post("/", upload.single('img'), async (req, res, next) => {
	let { comment } = req.body;
	let img = req.file ? req.file.filename : '';
	let postResult = await Post.create({
		comment,
		img,
		UserId: req.user.id,
	});
	let tags = req.body.comment.match(/#[^\s]*/g);
	// tags = ['#트와이스', '#걸그룹', '#girlGroup'];
	if(tags) {
		let tagResult = await Promise.all(tags.map((tag) => {
			HashTag.findOrCreate({
				where: {title: tag.substr(1).toLowerCase()}
			});
		}));
		/*
		A.getB() - 관계조회
		A.addB() - 관계저장
		A.setB() - 관계수정
		A.removeB() - 관계삭제
		*/
		let relResult = await postResult.addHashTags(tagResult.map((tag) => {
			 return tag[0];
		}));
	}
	res.json(postResult);
});

module.exports = router;