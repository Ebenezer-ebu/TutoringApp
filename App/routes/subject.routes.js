const { authJwt } = require("../middleware");
const controller = require("../controllers/subject.controller")


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
      next();
  });

  app.get("/api/v1/subjects/:id", [authJwt.verifyToken], controller.findOne);

  app.get("/api/v1/subjects", [authJwt.verifyToken], controller.findAll);

  app.post("/api/v1/subjects", [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  app.put("/api/v1/subjects/:id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isTutor], controller.update);

  app.delete("/api/v1/subjects/:id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isTutor], controller.delete);
}