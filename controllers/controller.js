const db = require("../models");

// Defining methods for the booksController
module.exports = {
    findAll: function (req, res) {
        db[req.params.model]
            .findAll()
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAllWhere: function (req, res) {
        db[req.params.model]
            .findAll({
                where: {
                    [req.params.column]: req.params.query
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findProgram: function (req, res) {
        db.programs
            .findOne({
                where: {
                    'id': req.params.query
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findChallenges: function (req, res) {
        db.programs
            .findAll({
                where: {
                    'category': "challenge"
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findWorkout: function (req, res) {
        db.workouts
            .findOne({
                where: {
                    'id': req.params.query
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getWorkoutInProgram: function (req, res) {
        db.workouts
            .findOne({
                where: {
                    'programId': req.query.program,
                    'programOrder': req.query.index
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getUser: function (req, res) {
        db.users
            .findOrCreate({ where: { email: req.body.email }, defaults: { userName: req.body.name, profileUrl: req.body.img } })
            .spread((user, created) => {
                res.json(user)
            })
            .catch(err => res.status(422).json(err));
    },
    getRecentWorkouts: function (req, res) {
        db.users
            .findOne({
                where: { 'id': req.params.id },
                include: [{
                    model: db.workouts,
                    through: {
                        model: db.userworkouts,
                    },
                    order: [[db.Sequelize.literal('userworkouts.order'), 'ASC']],
                }],
            })
            .then(dbResult => {
                res.json(dbResult)
            })
            .catch(err => res.status(422).json(err));
    },
    getUserWorkouts: function (req, res) {
        db.userworkouts
            .findAll({
                where: { 'userId': req.params.id },
                include: [{
                    model: db.workouts,
                }]
            })
            .then(dbResult => {
                res.json(dbResult)
            })
            .catch(err => res.status(422).json(err));

    },
    logUserWorkout: function (req, res) {
        let data = req.body.data;
        let notes = req.body.notes;
        let date = req.body.date;

        db.userworkouts
            .create({
                'userId': req.params.id,
                'workoutId': data.id,
                'notes': notes,
                'createdAt': date
            })
            .then(result => {

                db.programs.findOne({ where: { 'id': data.programId } }).then(program => {
                    db.userprograms
                        .update({
                            'lastCompleted': data.programOrder,
                            'progress': data.programOrder / program.length,
                            'isCompleted': (data.programOrder === program.length)
                        }, {
                            where: {
                                'userId': req.params.id,
                                'programId': data.programId,
                                'isCompleted': 0
                            }
                        })
                        .then(result => {

                            res.json(result)

                        })
                })

            })
            .catch(err => res.status(422).json(err));
    },
    getUserPrograms: function (req, res) {
        db.sequelize.query(`SELECT up.*, p.*, up.id FROM userprograms up INNER JOIN programs p ON up.programId = p.id WHERE up.userId = ${req.params.id} AND up.isCompleted = 0;`,
            { replacements: [req.params.id], type: db.sequelize.QueryTypes.SELECT, plain: false, raw: true })
            .then((data) => {
                res.json(data)
            })
            .catch(err => res.status(422).json(err));

    },
    deleteUserProgram: function (req, res) {
        db.userprograms.destroy({
            where: {
                'id': req.params.id
            }
        })
            .then(dbResult => {
                res.json(dbResult)
            })
            .catch(err => res.status(422).json(err));
    },
    addUserProgram: function (req, res) {
        console.log(req.body)
        console.log(req.params.id)
        db.userprograms.create({
            'userId': req.params.id,
            'programId': req.body.data.id,
            'programLength': req.body.data.length,
            'lastCompleted': 0,

        })
            .then(dbResult => {
                res.json(dbResult)
            })
            .catch(err => res.status(422).json(err));
    }
};
