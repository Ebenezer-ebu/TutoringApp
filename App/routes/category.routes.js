const { authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller")


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
      next();
  });

  app.get("/api/v1/subjects/:id", [authJwt.verifyToken], controller.findOne);

  app.get("/api/v1/categories", [authJwt.verifyToken], controller.findAll);

  app.put("/api/v1/subjects/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

  app.delete("/api/v1/subjects/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
}