const router = require("express").Router();

const bookingServices = require("../services/bookingServices.js");

const renderHomePage = async (req, res) => {
	try {
		let hotels = await bookingServices.getAll();
		res.render("home-pages/home", { hotels });
	} catch (error) {
		res.locals.error = error;
		res.render("home-pages/home");
	}
};

router.get("/", renderHomePage);

module.exports = router;
