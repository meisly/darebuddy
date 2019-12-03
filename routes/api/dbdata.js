const router = require("express").Router();
const controller = require("../../controllers/controller");

// Matches with "/api/dbdata"
router.route("/:model")
  .get(controller.findAll);

router.route("/program/id/:query")
    .get(controller.findProgram);

router.route("/workout/id/:query")
    .get(controller.findWorkout);

router.route("/program/workout")
    .get(controller.getWorkoutInProgram);

router.route("/programs/challenges")
    .get(controller.findChallenges);

router.route("/userworkouts/user/:id")
  .get(controller.getUserWorkouts);
router.route("/userworkouts/user/:id")
  .post(controller.logUserWorkout)

router.route("/userworkouts/user/:id/recent")
    .get(controller.getRecentWorkouts);

router.route("/userprograms/user/:id")
  .get(controller.getUserPrograms);
router.route("/userprograms/user/:id")
  .post(controller.addUserProgram);
router.route("/userprograms/:id")
  .delete(controller.deleteUserProgram);

router.route("/user")
  .post(controller.getUser);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .delete(booksController.remove);

module.exports = router;
