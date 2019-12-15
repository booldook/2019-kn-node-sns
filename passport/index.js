const local = require('./local');
const { User } = require("../models");
module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		try {
			let result = await User.find({
				where: { id },
				include: [{
					model: User,
					attributes: ['username'],
					as: 'followers'
				}, {
					model: User,
					attributes: ['username'],
					as: 'followings'
				}]
			});
			done(null, result);
		} catch (err) {
			done(err);
		}
	});
	local(passport);
}