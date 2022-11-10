const userService = require("../../../services/userService")

const cloudinary = require("../../upload/cloudinary")

const { User } = require("../../../models")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const salt = 10

function encyptedPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, encryptedPassword) => {
            if (!!err) {
                reject(err)
                return
            }

            resolve(encryptedPassword)
        })
    })
}

function checkPassword(encryptedPassword, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
            if (!!err) {
                reject(err)
                return
            }

            resolve(isPasswordCorrect)
        })
    })
}

function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia")
}

module.exports = {
    async whoIsLogin(req, res, next) {
        try {
            const bearerToken = req.headers.authorization
            const token = bearerToken.split(" ")[1]
            const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia")

            req.user = await User.findByPk(tokenPayload.id)
            next()
        } catch (err) {
            res.status(401).json({
                status: "UNAUTHORIZED",
                errors: err.message
            })
        }
    },

    currentUser(req, res) {
        res.status(200).json(req.user)
    },

    async login(req, res) {
        const email = req.body.email.toLowerCase()
        const password = req.body.password

        const user = await User.findOne({ where: { email } })

        if (!user) {
            res.status(404).json({ message: "User Not Found" })
            return
        }

        const isPasswordCorrect = await checkPassword(user.password, password)

        if (!isPasswordCorrect) {
            res.status(404).json({ message: "Password Wrong" })
            return
        }

        const token = createToken({
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email
        })

        res.status(200).json({ token: token })
    },

    async register(req, res) {
        const email = req.body.email.toLowerCase()
        const encryptedPassword = await encyptedPassword(req.body.password)

        const rolePicker = typeof req.user === 'undefined' ? "member" : req.user.role === "superadmin" ? "admin" : "member"

        const isEmailExists = await User.findOne({ where: { email } })

        if (isEmailExists) {
            res.status(400).json({ message: "This email already exists" })
            return
        }

        if (req.file == null) {
            const body = {
                ...req.body,
                email: email,
                role: rolePicker,
                password: encryptedPassword
            }

            userService.create(body)
                .then((user) => {
                    res.status(201).json({
                        status: "CREATED",
                        data: user
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        status: "BAD REQUEST",
                        errors: err.message
                    })
                })
        } else {
            const fileBase64 = req.file.buffer.toString("base64")
            const file = `data:${req.file.mimetype};base64,${fileBase64}`

            cloudinary.uploader.upload(file, { folder: 'user' }, function (err, result) {
                if (!!err) {
                    res.status(400).json({
                        status: "UPLOAD FAIL",
                        errors: err.message
                    })
                    return
                }

                const body = {
                    ...req.body,
                    email: email,
                    role: rolePicker,
                    password: encryptedPassword,
                    image: result.url
                }

                userService.create(body)
                    .then((user) => {
                        res.status(201).json({
                            status: "CREATED",
                            data: user
                        })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            status: "BAD REQUEST",
                            errors: err.message
                        })
                    })
            })
        }
    },

    async update(req, res) {
        if (req.file == null) {
            userService.update(req.user.id, req.body)
                .then(() => {
                    res.status(200).json({ message: "Update successfully" })
                })
                .catch((err) => {
                    res.status(422).json({
                        status: "FAIL",
                        errors: err.message
                    })
                })
        } else {
            const userImage = req.user.image

            if (userImage !== null) {
                const imageID = userImage.split("/").pop().split(".")[0]

                await cloudinary.uploader.destroy(`user/${imageID}`)
            }

            const fileBase64 = req.file.buffer.toString("base64")
            const file = `data:${req.file.mimetype};base64,${fileBase64}`

            cloudinary.uploader.upload(file, { folder: 'user' }, function (err, result) {
                if (!!err) {
                    res.status(400).json({
                        status: "UPLOAD FAIL",
                        errors: err.message
                    })
                    return
                }

                const body = {
                    ...req.body,
                    image: result.url
                }

                userService.update(req.user.id, body)
                    .then(() => {
                        res.status(200).json({ message: "Update successfully" })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            status: "FAIL",
                            errors: err.message
                        })
                    })
            })
        }
    },

    async delete(req, res) {
        userService.update(req.user.id, { exist: false })
            .then(() => {
                res.status(204).end()
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    errors: err.message
                })
            })
    }
}