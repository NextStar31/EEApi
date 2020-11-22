// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!",
  });
});
var eventsController = require("./controllers/events/eventsController");

router
  .route("/events")
  .get(eventsController.index)
  .post(eventsController.add);

router
  .route("/events/:id")
  .delete(eventsController.delete)
  .patch(eventsController.update);

router.route("/total").get(totalController.index);

router.route("/users").get(userController.index);

router.route("/stocks").get(stocksController.index);

// Export API routes
module.exports = router;
