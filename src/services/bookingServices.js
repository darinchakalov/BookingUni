const Hotel = require("../models/Hotel.js");

const create = function (hotel, city, freeRooms, imgUrl) {
	return Hotel.create({ hotel, city, freeRooms, imgUrl });
};

const getAll = function name() {
	return Hotel.find().lean();
};

const bookingServices = {
	create,
	getAll,
};

module.exports = bookingServices;
