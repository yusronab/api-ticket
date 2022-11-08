const express = require("express")
const controllers = require("../app/controllers")
const uploadValidation = require("../app/controllers/upload/validation")

const apiRouter = express.Router()

apiRouter.get("/api/users/all", controllers.api.v1.userController.list)
apiRouter.get("/api/users/detail/:id", controllers.api.v1.userController.detail)
apiRouter.get("/api/users/current", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.userController.currentUser)
apiRouter.post("/api/users/register", uploadValidation, controllers.api.v1.userController.register)
apiRouter.post("/api/users/login", controllers.api.v1.userController.login)

apiRouter.get("/api/errors", () => {
    throw new Error(
        "The Industrial Revolution and its consequences have been a disaster for the human race."
    );
});

apiRouter.use(controllers.api.main.onLost)
apiRouter.use(controllers.api.main.onError)

module.exports = apiRouter