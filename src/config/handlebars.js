const path = require("path");
const handlebars = require("express-handlebars");

module.exports = (app) => {
	app.engine(
		"hbs",
		handlebars.engine({
			extname: "hbs",
		})
	);
	app.set("views", path.resolve(__dirname, "../views"));
	app.set("view engine", "hbs");
};
