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

const renderDetailsPage = async (req, res) => {
	try {
		let hotel = await bookingServices.getOne(req.params.id);
        
		res.render("booking-pages/details", hotel);
	} catch (error) {
		res.locals.error = error.message;
		res.render("booking-pages/details");
	}
};

router.get("/create", renderCreatePage);
router.post("/create", createBooking);
router.get("/details/:id", renderDetailsPage);

module.exports = router;
