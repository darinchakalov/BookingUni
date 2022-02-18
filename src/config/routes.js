const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const nonExistingController = require("../controllers/nonExistingController.js");
const bookingController = require("../controllers/bookingController.js");

module.exports = (app) => {
	app.use(homeController);
	app.use(authController);
	app.use(bookingController);
	app.use(nonExistingController);
};
