const express = require('express');
const router = express.Router();
const { User } = require("../models");
const { isLogin, isLogout } = require("../passport/auth");

router.post("/follow", async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				id: req.body.userid
			}
		});
		const result = await user.addFollowing(Number(req.body.follerid));
		res.json(result);
	}
	catch(err) {
		next(err);
	}
});

module.exports = router;