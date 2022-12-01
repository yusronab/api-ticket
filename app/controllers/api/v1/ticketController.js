const ticketService = require("../../../services/ticketService")

module.exports = {
    async create(req, res) {
        const takeDate = new Date(req.body.takeOff).getDate()
        const arriveDate = new Date(req.body.arrive).getDate()
        const countUser = await ticketService.counting()
        const getCount = countUser.toString().length == 3 ? countUser.toString() : countUser.toString().length == 2 ? "0" + countUser.toString() : "00" + countUser.toString()
        const getTakeDates = takeDate.toString().length == 2 ? takeDate.toString() : "0" + takeDate.toString()
        const getArriveDates = arriveDate.toString().length == 2 ? arriveDate.toString() : "0" + arriveDate.toString()
        
        const customCode = "TI" + getCount + "T" + getTakeDates + "A" + getArriveDates

        const body = {
            ...req.body,
            code: customCode
        }

        ticketService.create(body)
            .then((ticket) => {
                res.status(201).json({
                    status: "CREATED",
                    data: ticket
                })
            })
            .catch((err) => {
                res.status(400).json({
                    status: "BAD REQUEST",
                    errors: err.message
                })
            })
    },

    list(req, res) {
        ticketService.list()
            .then(({ data }) => {
                res.status(200).json({
                    status: "OK",
                    data: { tickets: data }
                })
            })
            .catch((err) => {
                res.status(401).json({
                    status: "FAIL",
                    errors: err.message
                })
            })
    },

    update(req, res) {
        ticketService.update(req.params.id, req.body)
            .then(() => {
                res.status(200).json({ message: "Update Successfully" })
            })
            .catch((err) => {
                res.status(401).json({
                    status: "FAIL",
                    errors: err.message
                })
            })
    },

    destroy(req, res) {
        ticketService.delete(req.params.id)
            .then(() => {
                res.status(204).end()
            })
            .catch((err) => {
                res.status(401).json({
                    status: "FAIL",
                    errors: err.message
                })
            })
    },

    get(req, res) {
        ticketService.get(req.params.id)
            .then((ticket) => {
                res.status(200).json({
                    status: "OK",
                    data: ticket
                })
            })
            .catch((err) => {
                res.status(401).json({
                    status: "FAIL",
                    errors: err.message
                })
            })
    }
}