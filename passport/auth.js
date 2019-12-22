const { alertLoc } = require("../modules/util");

const isLogin = (req, res, next) => {
	if(req.isAuthenticated()) next();
	else res.send(alertLoc("정상적인 접근이 아닙니다.", '/'));
}

const isLogout = (req, res, next) => {
	if(!req.isAuthenticated()) next();
	else res.send(alertLoc("로그인 된 상태에서는 사용할 수 없습니다.", '/'));
}

module.exports = { isLogin, isLogout };