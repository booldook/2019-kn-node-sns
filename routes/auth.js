const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { alertLoc } = require("../modules/util");
const { isLogin, isNotLogin } = require('../passport/authValidate');

router.post("/join", async(req, res, next) => {
	let { email, userpw, username } = req.body;
	try {
		let result = await User.findOne({ where: {email} });
		console.log(result);
		if(result) {
			res.send(alertLoc('이미 존재하는 이메일입니다.', '/'));
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

router.post("/login", (req, res, next) => {
	passport.authenticate('local', (error, user, info) => {
		console.log("passport");
		if(error) {
			console.error(error);
			next(error);
		}
		else if(!user) {
			res.send(alertLoc('일치하는 회원이 없습니다.', '/'));
		}
		else {
			req.login(user, (err) => {
				if(err) next(err);
				else {
					res.send(alertLoc("로그인 되었습니다.", "/"));
				}
			});
		}
	})(req, res, next)
});

module.exports = router;