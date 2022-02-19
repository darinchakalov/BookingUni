const router = require("express").Router();

const bookingServices = require("../services/bookingServices.js");

const renderCreatePage = (req, res) => {
	res.render("booking-pages/create");
};

const createBooking = async (req, res) => {
	let userId = res.user?.id;
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


router.get("/create", renderCreatePage);
router.post("/create", createBooking);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", renderEditPage);
router.post("/edit/:id", editHotel);
router.get("/delete/:id", deleteHotel);
router.get("/book/:id", bookHotel);

module.exports = router;
