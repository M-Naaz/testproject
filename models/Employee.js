const mongoose = require ("mongoose");
const Schema = mongoose.Schema

const employeeSchema  = new Schema({

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
const Employee = mongoose.model("employee", employeeSchema)
module.exports = Employee
