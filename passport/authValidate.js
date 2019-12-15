exports.isLogin = (req, res, next) => {
	console.log("isLogin");
	if(req.isAuthenticated()) next();
	else res.send('login require');
};

exports.isNotLogin = (req, res, next) => {
	console.log("isNotLogin");
	if(!req.isAuthenticated()) next();
	else res.redirect('/');
}