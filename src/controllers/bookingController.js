const router = require("express").Router();

const bookingServices = require("../services/bookingServices.js");

const renderCreatePage = (req, res) => {
	res.render("booking-pages/create");
};

const createBooking = async (req, res) => {
	const { hotel, city, freeRooms, imgUrl } = req.body;

	try {
		await bookingServices.create(hotel, city, freeRooms, imgUrl);
		res.redirect("/");
	} catch (error) {
		res.locals.error = error.message;
		res.render("booking-pages/create");
	}
};

router.get("/create", renderCreatePage);
router.post("/create", createBooking);

module.exports = router;
