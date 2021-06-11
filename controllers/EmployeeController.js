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
const store = (req, res, next) => {
    const employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone
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

