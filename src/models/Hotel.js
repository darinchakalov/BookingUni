const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
	hotel: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	freeRooms: {
		type: Number,
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	usersBooked: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

bookingSchema.method("availableRooms", function () {
	return this.freeRooms - this.usersBooked.length;
});

const Hotel = mongoose.model("Hotel", bookingSchema);

module.exports = Hotel;
