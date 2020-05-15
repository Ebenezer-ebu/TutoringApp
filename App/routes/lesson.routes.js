const { authJwt } = require("../middlewares");
const controller = require("../controllers/lesson.controller")


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
      next();
  });

  app.get("/api/v1/lessons/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  app.get("/api/v1/lessons", [authJwt.verifyToken], controller.findAll);

  app.post("/api/v1/lessons", [authJwt.verifyToken, authJwt.isTutor], controller.create);

  app.put("/api/v1/lessons/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

  app.delete("/api/v1/lessons/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
}