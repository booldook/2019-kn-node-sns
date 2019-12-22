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
			return HashTag.findOrCreate({
				where: {title: tag.substr(1).toLowerCase()}
			});
		}));
		// res.json(tagResult);
		/*
		A.getB() - 관계조회
		A.addB() - 관계저장
		A.setB() - 관계수정
		A.removeB() - 관계삭제
		*/
		let relResult = await postResult.addHashTag(tagResult.map((tag) => {
			 return tag[0];
		}));
	}
	res.redirect("/");
});

router.get("/tag", async (req, res, next) => {
	const tag = req.query.tag;
	if(tag) {
		let result = await HashTag.findOne({
			where: {title: tag}
		});
		if(result) {
			try{
				let postResult = await result.getPosts({
					include: [{
						model: User,
						attributes: ['id', 'username']
					}]
				}, {
					order: [['id', 'DESC']]
				});
				for(let item of postResult) {
					if(item.img) item.img = '/files/'+item.img.split("-")[0]+"/"+item.img;
				};
				res.render('index', { 
					title: 'SNS',
					user: req.user,
					lists: postResult,
					tag
				});
			}
			catch(err) {
				next(err);
			}
		}
	}
	else res.redirect("/");
});

module.exports = router;