const Hotel = require("../models/Hotel.js");

const create = function (hotel, city, freeRooms, imgUrl, owner) {
	return Hotel.create({ hotel, city, freeRooms, imgUrl, owner });
};

const getAll = function name() {
	return Hotel.find().lean();
};

const getOne = function (id) {
	return Hotel.findById(id).lean();
};

const bookingServices = {
	create,
	getAll,
	getOne,
};

module.exports = bookingServices;
