const express = require("express")
const controllers = require("../app/controllers")
const uploadValidation = require("../app/controllers/upload/validation")

const apiRouter = express.Router()

// superadmin and admin action
apiRouter.get("/v1/admin/all", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.adminController.list)
apiRouter.get("/v1/admin/detail/:id", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.adminController.detail)

// superadmin action
apiRouter.put("/v1/admin/update/:id", uploadValidation, controllers.api.v1.userController.whoIsLogin, controllers.api.v1.adminController.update)
apiRouter.delete("/v1/admin/delete/:id", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.adminController.destroy)
apiRouter.post("/v1/admin/register", uploadValidation, controllers.api.v1.userController.whoIsLogin, uploadValidation, controllers.api.v1.userController.register)

// user action
apiRouter.get("/v1/user/current", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.userController.currentUser)
apiRouter.put("/v1/user/update", uploadValidation, controllers.api.v1.userController.whoIsLogin, controllers.api.v1.userController.update)
apiRouter.delete("/v1/user/delete", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.userController.delete)
apiRouter.post("/v1/user/register", uploadValidation, controllers.api.v1.userController.register)
apiRouter.post("/v1/user/login", controllers.api.v1.userController.login)

// user history transaction
apiRouter.get("/v1/user/history", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.transController.history)
// user notification
apiRouter.get("/v1/user/notify", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.notifyController.userNotify)

// ticket handle
apiRouter.get("/v1/ticket", controllers.api.v1.ticketController.list)
apiRouter.post("/v1/ticket", controllers.api.v1.ticketController.create)
apiRouter.get("/v1/ticket/:id", controllers.api.v1.ticketController.get)
apiRouter.put("/v1/ticket/:id", controllers.api.v1.ticketController.update)
apiRouter.delete("/v1/ticket/:id", controllers.api.v1.ticketController.destroy)

// transaction handle
apiRouter.get("/v1/trans", controllers.api.v1.transController.list)
apiRouter.put("/v1/trans/paid/:transId", controllers.api.v1.transController.payingTrans)
apiRouter.put("/v1/trans/cancel/:transId", controllers.api.v1.transController.cancelTrans)
apiRouter.post("/v1/trans/:ticketId", controllers.api.v1.userController.whoIsLogin, controllers.api.v1.transController.create)

// notify handle
apiRouter.get("/v1/notify", controllers.api.v1.notifyController.list)
apiRouter.put("/v1/notify/:id", controllers.api.v1.notifyController.updateReading)

apiRouter.get("/api/errors", () => {
    throw new Error(
        "The Industrial Revolution and its consequences have been a disaster for the human race."
    );
});

apiRouter.use(controllers.api.main.onLost)
apiRouter.use(controllers.api.main.onError)

module.exports = apiRouter