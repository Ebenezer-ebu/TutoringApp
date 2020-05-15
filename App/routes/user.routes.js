const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/user/:firstname", [authJwt.verifyToken], controller.findByName);

  app.get("/api/v1/user/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  app.delete("/api/v1/user/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

  app.get("/api/v1/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.subjectByUser);
};