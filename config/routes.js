const express = require("express")
const controllers = require("../app/controllers")
const uploadValidation = require("../app/controllers/upload/validation")

const apiRouter = express.Router()

// superadmin and admin action
apiRouter.get("/api/user/all", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.userController.list)
apiRouter.get("/api/user/detail/:id", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.userController.detail)

// superadmin action
apiRouter.put("/api/user/update/:id", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.userController.update)
apiRouter.delete("/api/user/delete/:id", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.userController.destroy)


// register for add data admin, privilage only for superadmin role
apiRouter.post("/api/admin/register", controllers.api.v1.userController.whoIsLogin, uploadValidation, controllers.api.v1.userController.register)

// user action
apiRouter.get("/api/user/current", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.userController.currentUser)
apiRouter.post("/api/user/register", uploadValidation, controllers.api.v1.userController.register)
apiRouter.post("/api/user/login", controllers.api.v1.userController.login)

apiRouter.get("/api/errors", () => {
    throw new Error(
        "The Industrial Revolution and its consequences have been a disaster for the human race."
    );
});

apiRouter.use(controllers.api.main.onLost)
apiRouter.use(controllers.api.main.onError)

module.exports = apiRouter