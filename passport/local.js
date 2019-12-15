const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const { User } = require('../models'); 

module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'userpw'
	}, async (email, userpw, done) => {
		try {
			const user = await User.findOne({
				where: {email}
			});
			console.log(user);
			if(user) {
				const result = await bcrypt.compare(userpw, user.userpw);
				if(result) done(null, user)
				else done(null, false, {msg: "비밀번호가 일치하지 않습니다."});
			}
			else {
				done(null, false, {msg: "이메일을 찾을 수 없습니다."});
			}
		}
		catch(err) {
			console.error(err);
			done(err);
		}
	}))
}

