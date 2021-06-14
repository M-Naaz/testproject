const Employee = require("../models/Employee")

const index = (req, res, next) => {
    Employee.find()
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
const show = (req, res, next) => {
    const employeeID = req.body.employeeID
    Employee.findById(employeeID)
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
//add new employee
const store = (req, res, next) => {
    const employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        profileImage: req.body.profileImage
    })
    if(req.files) {
        const path = ""
        req.files.foreach(function(files, index, arr){
            path = path + files.path + ","
        })
        path = path.substring(0, path.lastIndexOf(","))
        employee.profileImage = path
    }
    
    employee.save()
    .then(response => {
        res.json({
            message: "employee added successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "an error occured"
        })
    })
}

//update an employee
const update = (req, res, next) => {
    const employeeID = req.body.employeeID
   const updateData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    profileImage: req.body.profileImage
   }
   Employee.findByIdAndUpdate(employeeID, {$set: updateData})
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

exports.store = store;
exports.show = show;
exports.index = index;
exports.update = update;