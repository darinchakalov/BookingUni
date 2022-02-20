const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
	hotel: {
		type: String,
		required: true,
		minlength: [4, "Hotel name needs to be atleast 4 characters long"],
	},
	city: {
		type: String,
		required: true,
		minlength: [3, "City name needs to be atleast 4 characters long"],
	},
	freeRooms: {
		type: Number,
		required: true,
		min: [1, "Cannot have less that 1 free rooms"],
		max: [100, "Cannot have more than 100 free rooms"],
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
