const Hotel = require("../models/Hotel.js");

const create = function (hotel, city, freeRooms, imgUrl) {
	return Hotel.create({ hotel, city, freeRooms, imgUrl });
};

const bookingServices = {
	create,
};

module.exports = bookingServices;
