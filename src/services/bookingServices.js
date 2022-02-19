const Hotel = require("../models/Hotel.js");

const create = function (hotel, city, freeRooms, imgUrl) {
	return Hotel.create({ hotel, city, freeRooms, imgUrl });
};

const getAll = function name() {
	return Hotel.find().lean();
};

const getOne = function (id) {
	return Hotel.findById(id);
};

const bookingServices = {
	create,
	getAll,
	getOne,
};

module.exports = bookingServices;
