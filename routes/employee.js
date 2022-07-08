const express = require('express')
const router = express.Router()
const Employee = require('../models/Employee')

const verifyToken = require('../routes/verifyToken')

//AddEmployee
router.post('/:addEmployee', verifyToken, async (req, res) => {
    const employees = new Employee({
        name: req.body.name,
        address: req.body.address
    })

    try {
        const employee = await employees.save()
        res.json(employee)
    } catch (err) {
        res.json(messages.err)
    }
})

//getAllEmpoyees
router.get('/', verifyToken, async (req, res) => {
    try {
        const employee = await Employee.find()
        res.json(employee)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

//Edit
router.put('/:updateBy/:employeeId', verifyToken, async (req, res) => {
    try {
        const employeeUpdate = await Employee.updateOne({
            _id: req.params.employeeId
        }, {
            name: req.body.name,
            address: req.body.address
        })
        res.json(employeeUpdate)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

//delete
router.delete('/:deleteBy/:employeeId', verifyToken, async (req, res) => {
    try {
        const employeeUpdate = await Employee.deleteOne({
            _id: req.params.employeeId
        })
        res.json(employeeUpdate)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

// router.get('/', (req, res) => {
//     res.send('Test')
// })

module.exports = router