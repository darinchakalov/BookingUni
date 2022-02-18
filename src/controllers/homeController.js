const router = require("express").Router();

const renderHomePage = (req, res) => {
	res.render("home-pages/home");
};

router.get("/", renderHomePage);

module.exports = router;
