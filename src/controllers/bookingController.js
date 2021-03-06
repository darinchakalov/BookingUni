const router = require("express").Router();

const bookingServices = require("../services/bookingServices.js");
const { isGuest, isAuth } = require("../middlewares/authMiddleware.js");
const validator = require("validator");

const renderCreatePage = (req, res) => {
	res.render("booking-pages/create");
};

const createBooking = async (req, res) => {
	let userId = res.user?.id;

	const { hotel, city, freeRooms, imgUrl } = req.body;

	if (
		(!validator.isURL(imgUrl))
	) {
		res.locals.error = "Image URL is not a valid URL";
		return res.render("booking-pages/create");
	}

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
		let owner = res.user?.id == hotel.owner;
		let booked = await bookingServices.getBooked(req.params.id);
		let availableRooms = booked.availableRooms();
		let hasRooms = availableRooms > 0;
		let hasBooked = booked.usersBooked.some((x) => x._id == res.user?.id);
		res.render("booking-pages/details", { ...hotel, owner, hasBooked, hasRooms, availableRooms });
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

const deleteHotel = async (req, res) => {
	try {
		await bookingServices.del(req.params.id);
		res.redirect("/");
	} catch (error) {
		res.locals.error = error.message;
		res.render("booking-pages/details");
	}
};

const bookHotel = async (req, res) => {
	try {
		await bookingServices.book(res.user.id, req.params.id);
		res.redirect(`/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("booking-pages/details");
	}
};

router.get("/create", isAuth, renderCreatePage);
router.post("/create", isAuth, createBooking);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", isAuth, renderEditPage);
router.post("/edit/:id", isAuth, editHotel);
router.get("/delete/:id", isAuth, deleteHotel);
router.get("/book/:id", isAuth, bookHotel);

module.exports = router;
