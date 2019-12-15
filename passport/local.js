const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models'); 
module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'userpw'
	}, async (email, userpw, done) => {
		try {
			const user = await User.find({
				where: {email}
			});
			if(user) {
				const result = await bcrypt.compare(userpw, User.userpw);
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
	}));
}