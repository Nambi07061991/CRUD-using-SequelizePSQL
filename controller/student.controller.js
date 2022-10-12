const db = require('../models');
const Student = db.student;
const Op = db.Sequelize.Op;

exports.create = (req, res) =>{
    console.log(req)
    if(!req.body.id){
        res.status(400).send({
            message:`Content cannot be Empty!`
        });
    }

    const student =  {
        id: req.body.id,
        name: req.body.name,
        subject: req.body.subject,
        status: req.body.status,
        mark: req.body.mark
    }

    Student.create(student)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Student."
            });
        });
};

exports.findAll = (req,res) => {
    const name = req.query.name;
    var condition = name ? { name: {[Op.like]: `%${name}}%`}} : null;

    Student.findAll({ where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.massage || "Some Error occurred while retrieving student"
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then(data =>{
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    message: `cannot find Student with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving student with id=` +id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
        where: { id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Student details was updated successfully.`
                });
            }else{
                res.send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error Updating Student with id=` +id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where:{ id: id}
    })
        .then(num => {
            if( num == 1){
                res.send({
                    message: "Student Details was deleted Successfully!"
                });
            }else{
                res.send({
                    message:`Cannot delete Student with id=${id}. Maybe Student was not found or req.body is empty`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" +id
            });
        });
};

exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Student were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some Error Occurred while removing all Student"
            });
        });
};

exports.findAllStatus = (req,res) => {
    const status = req.body.status;

    Student.findAll({ 
        where: { 
            status: status
         }})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some Error Occured While Retrieving Student."
                });
            });
};