const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Validator = require('validatorjs');

 const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            });
        };
        const user = new User ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        });

        user.save()
        .then(user => {
            res.json({
                message: "user added successfully"
            });
        })
        .catch(error => {
            res.json({
                message: "an error occured"
            });
        });
    
    })
}
     const login = (req, res, next) => {
        const username = req.body.username
        const password = req.body.password

        User.findOne({$or: [{email:username},{phone:username}]})
        .then(user => {
            if(user){
            
      bcrypt.compare(password, user.password, function(err, result){
      if(err){
          res.json({
              error: err
          })
      }
        if(result){
            const token = jwt.sign({name: user.name}, "verySecretiveValue", {expiresIn: "1min"})
          res.json({
              message: "login successful",
              token
          })
        }else{
            res.json({
                message: "password does not match"
            })
        }
      })
                }else{
                    res.json({
                        message: "no user found"
                    })
                }
            
        })
     }
     const show = (req, res, next) => {
        const id = req.params.id
        User.findById(id)
        .then(response => {
            res.json({
                response
            })
        })
    .catch(error => {
        res.json({
            message: "an error occured"
        })
    })
    
    }
     const update = (req, res, next) => {
        const employeeID = req.body.employeeID
        console.log(employeeID)
       const updateData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        profileImage: req.body.profileImage
       }
       User.findByIdAndUpdate(employeeID, {$set: updateData})
       .then(() => {
           res.json({
           message: "Employee updated successfully!"
       })
    })
    .catch(error => {
        res.json({
            message: "an error occured!"
        })
    })
    }
    
    
exports.register = register;
exports.login = login;
   exports.show = show;
   exports.update = update;

   
