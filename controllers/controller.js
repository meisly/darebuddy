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
    getUser: function (req, res) {
        db.users
            .findOne({
                where: {
                    email: req.params.email
                }
            })
            .then(dbModel => {
                if(!res){
                    db.users.create
                }
                res.json(dbModel)})
            .catch(err => res.status(422).json(err));
    }
    //   findByZip: function (req, res) {
    //     db.harris211
    //       .findAll({where: {
    //         zip_code: req.body.zip
    //       }})
    //       .then(data => console.log(data))
    //   },
    //   // findByCol: function(req, res) {
    //   //   db.harris211
    //   //     .findAll({where: })
    //   //     .then(dbModel => res.json(dbModel))
    //   //     .catch(err => res.status(422).json(err));
    //   // },
};
