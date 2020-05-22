const db = require("../models");

//Defining methods for the UserController
module.exports = {
    create: (req, res) => {
        console.log(`Create user ${req.body}`);
        db.User.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    findAll: (req, res) => {
        console.log(`Find All Users`)
        db.User.findAll({})
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },

    findOne: (req, res) => {
        console.log(req);
        db.User.findOne({
            where:req.params.userId})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    update: function (req, res) {
        db.User.update({ id: req.params.userId }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}