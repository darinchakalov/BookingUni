const router = require("express").Router();

const authServices = require("../services/authServices.js");
const { TOKEN_COOKIE_NAME } = require("../config/constants.js");
const { isAuth, isGuest } = require("../middlewares/authMiddleware.js");
const bookingServices = require("../services/bookingServices.js");

const renderLoginPage = (req, res) => {
	res.render("user-pages/login");
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
		return res.render("user-pages/login");
	}
};

const renderRegisterPage = (req, res) => {
	res.render("user-pages/register");
};

const registerUser = async (req, res) => {
	let { email, username, password, rePassword } = req.body;
	if (password !== rePassword) {
		res.locals.error = "Passwords do not match!";
		return res.render("user-pages/register");
	}
	if (await authServices.userExists(username)) {
		res.locals.error = "Username already exists!";
		return res.render("user-pages/register");
	}
	try {
		await authServices.register(email, username, password);

		let user = await authServices.login(username, password);
		let token = await authServices.createToken(user);
		res.cookie(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
		});

		res.redirect("/");
	} catch (error) {
		req.locals.error = "Passwords do not match!";
		res.render("user-pages/register");
	}
};

const logoutUser = (req, res) => {
	res.clearCookie(TOKEN_COOKIE_NAME);
	res.redirect("/");
};

const renderProfilePage = async (req, res) => {
	let userData = await authServices.getUser(res.user.id);
	let allHotels = await bookingServices.getAllPopulated();
	let userBookings = allHotels
		.filter((x) => x.usersBooked.some((x) => x._id == res.user.id))
		.map((x) => x.hotel)
		.join(", ");
	res.render("user-pages/profile", { userData, userBookings });
};

router.get("/login", isGuest, renderLoginPage);
router.post("/login", loginUser);
router.get("/register", isGuest, renderRegisterPage);
router.post("/register", registerUser);
router.get("/logout", isAuth, logoutUser);
router.get("/profile", isAuth, renderProfilePage);

module.exports = router;
