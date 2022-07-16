const { db, users, contactInfo } = require('../models');

const User = users;
const ContactInfo = contactInfo;
const Op = db.Sequelize.Op;

const create = async (req, res) => {
    try {
        if (!req.body.email) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        const user = {
            name: req.body.name,
            email: req.body.email,
        };
        console.log("🚀 ~ file: user.controller.js ~ line 19 ~ create ~ user", user)

        const saveUser = await User.create(user);
        const contact = {
            phone: req.body.phone,
            user_id: saveUser.id
        };
        await ContactInfo.create(contact);
        return res.send(saveUser);
    }
    catch (err) {
        return err;
    }
};
// Retrieve all Users from the database.
const findAll = (req, res) => {
    
    User.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
// Find a single User with an id
const findOne = async (req, res) => {
    try {
        const {id} = req.params;
        const findUser = await User.findOne({ 
            where: { id },
            attributes: ['id', 'email'],
            include: [{
                model: ContactInfo,
                where: {user_id: id},
                attributes: ['phone']
            }]
         });
        return res.send(findUser);
    } catch (error) {
        return error
    }
};
// Update a User by the id in the request
const update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'User was updated successfully'
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        })

};
// Delete a User with the specified id in the request
const deletes = (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

};
// Delete all Users from the database.
const deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deletes,
    deleteAll
}
