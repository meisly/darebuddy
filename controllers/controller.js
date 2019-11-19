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
        db.users
            .findOne({
                where: { 'id': req.params.id },
                include: [{
                    model: db.workouts,
                    through: {
                        model: db.userworkouts
                    }
                }]
            })
            .then(dbResult => {
                res.json(dbResult)
            })
            .catch(err => res.status(422).json(err));

    },
    logUserWorkout: function (req, res) {
        db.users
            .findOne({ where: { 'id': req.params.id } })
            .then(result => {
                result
                    .addWorkout(req.body.id)
                    .then(dbResult => {
                        res.json(dbResult)
                    })
                    .catch(err => res.status(422).json(err));
            })

    },
    getUserPrograms: function (req, res) {
        db.users
            .findOne({
                where: { 'id': req.params.id },
                include: [{
                    model: db.programs,
                    through: {
                        model: db.userprograms
                    }
                }]
            })
            .then(dbResult => {
                res.json(dbResult)
            })
            .catch(err => res.status(422).json(err));

    }
};
