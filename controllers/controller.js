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
        console.log(req.params)
        db[req.params.model]
            .findAll({
                where: {
                    [req.params.column]: req.params.query
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
    getUserWorkouts: function (req, res) {
        db.users
            .findOne({
                where: {'id': req.params.id},
                include: [{
                    model: db.workouts,
                    through: {
                        model: db.userworkouts
                    }
                }]
            })
            .then(dbResult => {
                console.log(db.userworkouts.workoutId)
                res.json(dbResult)
            })
            .catch(err => res.status(422).json(err));
        
    },
    getUserPrograms: function (req, res) {
        db.users
            .findOne({
                where: {'id': req.params.id},
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
