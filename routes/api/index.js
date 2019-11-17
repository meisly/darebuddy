const router = require("express").Router();
const dbdata = require("./dbdata");

// Book routes
router.use("/dbdata", dbdata);

module.exports = router;
