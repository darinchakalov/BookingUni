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

const edit = function (hotel, city, freeRooms, imgUrl, id) {
	return Hotel.findByIdAndUpdate(id, { hotel, city, freeRooms, imgUrl });
};

const del = function (id) {
	return Hotel.findByIdAndRemove(id);
};

const book = async function (userId, hotelId) {
	try {
		let hotel = await Hotel.findById(hotelId);
		hotel.usersBooked.push(userId);
		return hotel.save();
	} catch (error) {
		return error;
	}
};

const getBooked = function (id) {
	return Hotel.findById(id).populate("usersBooked");
};

const bookingServices = {
	create,
	getAll,
	getOne,
	edit,
	del,
	book,
	getBooked,
};

module.exports = bookingServices;
