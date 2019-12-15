const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post("/join", async(req, res, next) => {
	let { email, userpw, username } = req.body;
	try {
		let result = await User.find({ where: {email} });
		if(result) {
			req.flash('joinError', '이미 존재하는 이메일입니다.');
			res.redirect("/");
		}
		else {
			let hash = await bcrypt.hash(userpw, 9);
			let resultUser = await User.create({
				email,
				userpw: hash,
				username
			});
			res.json(resultUser);
		}
	}
	catch(err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;