const jwt = require("jsonwebtoken");
const { TOKEN_COOKIE_NAME, SECRET } = require("../config/constants.js");

exports.auth = (req, res, next) => {
	const token = req.cookies[TOKEN_COOKIE_NAME];

	if (!token) {
		return next();
	}

	jwt.verify(token, SECRET, function (err, decodedToken) {
		if (err) {
			res.clearCookie(TOKEN_COOKIE_NAME);
			return res.redirect("/login");
		}
		res.user = decodedToken;
		res.locals.user = decodedToken;
		return next();
	});
};

exports.isAuth = (req, res, next) => {
	if (res.user) {
		next();
	} else {
		res.redirect("/");
	}
};

exports.isGuest = (req, res, next) => {
	if (!res.user) {
		next();
	} else {
		res.redirect("/");
	}
};
