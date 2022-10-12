

module.exports = app => {
    const student = require('../controller/student.controller');

    const router = require('express').Router();

    router.get('/', (req, res) => res.send('This is role route'));

    router.post("/student",student.create);

    router.get("/student", student.findAll);

    router.get("/student/status", student.findAllStatus);

    router.get("/student/:id", student.findOne);

    router.put("/student/:id", student.update);

    router.delete("/student/:id",student.delete);

    router.delete("/student", student.deleteAll);

    app.use('/api', router);
}