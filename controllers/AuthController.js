const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const httpCodes = require("http-status-codes");


//register
const register = async (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    const { email, password, name, phone } = req.body;
    /** Validation */
    const registerSchema = Joi.object().keys({
        email: Joi.string().required().email().messages({
            'string.empty': `Email is required`,
            'string.email': `Email is incorrect`,
        }),
        password: Joi.string().required().messages({
            'string.empty': `Password is required`,
        }),
        name: Joi.string().required().messages({
            'string.empty': `Name is required`,
        }),
        phone: Joi.string().required().messages({
            'string.empty': `Enter valid phone number`,
        }),
        profileImage: Joi.string(),
    });

    const result = await registerSchema.validate(req.body);
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        return res.status(httpCodes.UNPROCESSABLE_ENTITY).json({
            ErrorModel: {
                errorCode: httpCodes.UNPROCESSABLE_ENTITY,
                errorMessage: message
            }
        });
    } else {
        const doesExist = await User.findOne({ email: email })
        if (doesExist) {
            console.log(doesExist)
            return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                ErrorModel: {
                    errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                    errorMessage: "email already exist"

                }
            });
        } else {
            console.log(req.file)
            if (req.file == undefined) {
                res.status(400).send(' Error: No File Selected!');
            } else {
                req.body.profileImage = `${req.file.filename}`;
                userData = {
                    profileImage: req.body.profileImage
                };
            }

            let hashedPass = await bcrypt.hash(req.body.password, 10);

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPass,
                profileImage: req.body.profileImage
            });

            let createUser = await user.save()
            if (createUser) {
                console.log(createUser);
                return res.status(httpCodes.OK).json({
                    message: "User created Successfully"
                });
            } else {
                return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                    ErrorModel: {
                        errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                        errorMessage: "User not created"
                    }
                });
            }
        }

    }
}

//login
const login = async (req, res, next) => {
    const { username, password } = req.body;
    const loginSchema = Joi.object().keys({
        username: Joi.string().required().email().messages({
            'string.empty': `email is required`,
            'string.email': `email is incorrect`,
        }),
        password: Joi.string().required().messages({
            'string.password': `Password is incorrect`,
        })
    });
    const result = await loginSchema.validateAsync(req.body)
    const user = await User.findOne({ $or: [{ email: username }] })

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            res.json({
                error: err
            })
        }
        if (user) {
            const token = jwt.sign({ name: user.name }, "verySecretiveValue", { expiresIn: "1min" })
            console.log(user);
            return res.status(httpCodes.OK).json({
                message: "Login successful",
                token
            })
        } else {
            return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                ErrorModel: {
                    errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                    errorMessage: "password does not match"
                }

            })
        }
    })

}
//show
const show = async (req, res, next) => {
    const id = req.params.id
    const userInfo = await User.findById(id)
    if (userInfo) {
        return res.status(httpCodes.OK).json({
            data: userInfo,
            message: "Success"
        });
    } else {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            ErrorModel: {
                errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                errorMessage: "failed to fetch user information"
            }
        });
    }


}


//update
const update = async (req, res, next) => {
    const {
        email,
        phone,
        name,
        password
    } = req.body;
    const id = req.params.id
    const updateSchema = Joi.object().keys({
        email: Joi.string().required().email().messages({
            'string.empty': `Email is required`,
            'string.email': `Email is incorrect`,
        }),
        password: Joi.string().required().messages({
            'string.empty': `Password is required`,
        }),
        name: Joi.string().required().messages({
            'string.empty': `Name is required`,
        }),
        phone: Joi.string().required().messages({
            'string.empty': `Enter valid phone number`,
        }),
        profileImage: Joi.string().required().messages({
            'string.empty': 'choose a file',
        })
    });
    const result = await updateSchema.validate(req.body);
    const { value, error } = result;
    const valid = error == null;
    if (valid) {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        return res.status(httpCodes.UNPROCESSABLE_ENTITY).json({
            ErrorModel: {
                errorCode: httpCodes.UNPROCESSABLE_ENTITY,
                errorMessage: message
            }
        });
    } else {
        const doesExist = await User.findOne({ email: email, '_id': { $ne: id } })
        if (doesExist) {
            console.log(error)
            return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                ErrorModel: {
                    errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                    errorMessage: "email already exist"

                }
            });
        } else {
            console.log(req.file)
            if (req.file == undefined) {
                res.status(400).send(' Error: No File Selected!');
            } else {
                req.body.profileImage = `${req.file.filename}`;
                userData = {
                    profileImage: req.body.profileImage
                };
            }

            const updateData = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                profileImage: req.body.profileImage
            };
            const update = await User.findByIdAndUpdate(id, { $set: updateData })
            if (update) {
                console.log(update);
                return res.status(httpCodes.OK).json({
                    data: id,
                    message: "Successfully updated"
                });
            } else {
                console.log(update);
                return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                    ErrorModel: {
                        errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                        errorMessage: "failed to update"
                    }
                });
            }
        }

    }
}




exports.register = register;
exports.login = login;
exports.show = show;
exports.update = update;



