const mongoose = require ("mongoose");
const Schema = mongoose.Schema

<<<<<<< HEAD
const employeeSchema  = new Schema({
=======
const employeeSchema = new Schema({
>>>>>>> e8bcb5af8aa586d5ef4ecaaf9d18cd5ed3209260
    name: {
        type: String
    },
    designation: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    profileImage: {
        type: String
    }
}, {timestamps: true})
const Employee = mongoose.model("employees", employeeSchema)
module.exports = Employee
