const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const httpCodes = require("http-status-codes");

 const register = async (req, res, next) => {
    const {email, password,name ,phone} = req.body;
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
        })
    }); 

    const result = registerSchema.validate(req.body);
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
        const { details } = error; 
        const message = details.map(i => i.message).join(',');
        return res.status(httpCodes.UNPROCESSABLE_ENTITY).json({
            ErrorModel : {
                errorCode: httpCodes.UNPROCESSABLE_ENTITY,
                errorMessage: message
                }
        });
    }else{
        let hashedPass = await bcrypt.hash(req.body.password, 10);

            const user = new User ({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPass
            });
            
            let createUser = await user.save()
            if(createUser){
                console.log(createUser);
                return res.status(httpCodes.OK).json({
                    message: "User created Successfully"
                });
            }else{
                return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                    ErrorModel : {
                        errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                        errorMessage: "User not created"
                        }
                });
            }
    }
}
     //login

     const login = async(req, res, next) => {
        const {username, password} = req.body;
        const loginSchema = Joi.object().keys({
            username: Joi.string().required().email().messages({
                'string.empty': `E-post er obligatorisk`,
                'string.email': `Skriv inn en gyldig e-postadresse`,
            }),
            password: Joi.string().required().messages({
                'string.empty': `Passord er påkrevd`,
            })
        });
const result = await loginSchema.validateAsync(req.body)
        const user = await User.findOne({$or: [{email:username},{phone:username}]})
        
      bcrypt.compare(password, user.password, function(err, result){
      if(err){
          res.json({
              error: err
          })
      }
        if(user){
            const token = jwt.sign({name: user.name}, "verySecretiveValue", {expiresIn: "1min"})
            console.log(user);
                return res.status(httpCodes.OK).json({
                    message: "Login successful",
                    token
                })
            }else{
                return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                    ErrorModel : {
                        errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                        errorMessage: "password does not match"
                        }
        
            })
        }
      })
              
    }
     //show
     const show = (req, res, next) => {
        const id = req.params.id
        const userInfo= User.findById(id)
        if(userInfo){
            return res.status(httpCodes.OK).json({
                data: userInfo,
                message : "Success"
            });
        }else{
            return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                ErrorModel : {
                    errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                    errorMessage: "failed to fetch user information"
                    }
            });
        }
        
            
        
       
     }


        //update
     const update = async(req, res, next) => {
        const id = req.params.id
        console.log(id)
    
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
        profileImage: joi.string().require().messages({
            'string.empty': 'choose a file',
        })
    }); 

    const result = await updateSchema.validate(req.params);
    const  update= await id.findByIdAndUpdate(id, {$set: updateData})
        
  
    const { value, error } = result; 
    if(update){
        return res.status(httpCodes.OK).json({
            data: id,
            message : "Successfully updated"
        });
    }else{
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            ErrorModel : {
                errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                errorMessage: "failed to update"
                }
        });
    }

     }



    
    
exports.register = register;
exports.login = login;
   exports.show = show;
   exports.update = update;


     
