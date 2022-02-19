const router = require("express").Router();

const bookingServices = require("../services/bookingServices.js");

const renderCreatePage = (req, res) => {
	res.render("booking-pages/create");
};

const createBooking = async (req, res) => {
	let userId = res.user.id;
	const { hotel, city, freeRooms, imgUrl } = req.body;

	try {
		await bookingServices.create(hotel, city, freeRooms, imgUrl, userId);
		res.redirect("/");
	} catch (error) {
		res.locals.error = error.message;
		res.render("booking-pages/create");
	}
};

const renderDetailsPage = async (req, res) => {
	try {
		let hotel = await bookingServices.getOne(req.params.id);
		let owner = res.user.id == hotel.owner;
		res.render("booking-pages/details", { ...hotel, owner });
	} catch (error) {
		res.locals.error = error.message;
		res.render("booking-pages/details");
	}
};

const renderEditPage = async (req, res) => {
	try {
		let hotel = await bookingServices.getOne(req.params.id);
		res.render("booking-pages/edit", hotel);
	} catch (error) {
		res.locals.error = error.message;
		res.render("booking-pages/edit");
	}
};

const editHotel = async (req, res) => {
	const { hotel, city, freeRooms, imgUrl } = req.body;
	try {
		await bookingServices.edit(hotel, city, freeRooms, imgUrl, req.params.id);
		res.redirect(`/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("booking-pages/edit");
	}
};

router.get("/create", renderCreatePage);
router.post("/create", createBooking);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", renderEditPage);
router.post("/edit/:id", editHotel);

module.exports = router;
