const router = require("express").Router();

const authServices = require("../services/authServices.js");
const { TOKEN_COOKIE_NAME } = require("../config/constants.js");
const { isAuth, isGuest } = require("../middlewares/authMiddleware.js");

const renderLoginPage = (req, res) => {
	res.render("login");
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		let user = await authServices.login(username, password);

		let token = await authServices.createToken(user);

		res.cookie(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
		});

		res.redirect("/");
	} catch (error) {
		res.locals.error = error;
		return res.render("login");
	}
};

const renderRegisterPage = (req, res) => {
	res.render("register");
};

const registerUser = async (req, res) => {
	let { username, password, repeatPassword } = req.body;
	if (password !== repeatPassword) {
		res.locals.error = "Passwords do not match!";
		return res.render("register");
	}
	if (await authServices.userExists(username)) {
		res.locals.error = "Username already exists!";
		return res.render("register");
	}
	try {
		await authServices.register(username, password);

		let user = await authServices.login(username, password);
		let token = await authServices.createToken(user);
		res.cookie(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
		});

		res.redirect("/");
	} catch (error) {
		req.locals.error = "Passwords do not match!";
		res.render("register");
	}
};

const logoutUser = (req, res) => {
	res.clearCookie(TOKEN_COOKIE_NAME);
	res.redirect("/");
};

router.get("/login", isGuest, renderLoginPage);
router.post("/login", loginUser);
router.get("/register", isGuest, renderRegisterPage);
router.post("/register", registerUser);
router.get("/logout", isAuth, logoutUser);

module.exports = router;
