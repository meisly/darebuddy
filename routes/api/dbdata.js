const router = require("express").Router();
const controller = require("../../controllers/controller");

// Matches with "/api/dbdata"
router.route("/:model")
  .get(controller.findAll);

// router.route("/:model/:column/:query")
//     .get(controller.findAllWhere);

router.route("/userworkouts/user/:id")
    .get(controller.getUserWorkouts);

router.route("/userprograms/user/:id")
    .get(controller.getUserPrograms);

router.route("/user")
    .post(controller.getUser);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .delete(booksController.remove);

module.exports = router;
