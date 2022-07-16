const User = require("../models/user.model");

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "User Content can not be empty",
    });
  }

  //Create a user data
  const user = new User({
    name: req.body.name || "Untitled User",
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
    online: req.body.online,
  });
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User",
      });
    });
};

exports.findAll = async (req, res) => {
  const data = await User.findAll();
  return res.status(200).json(data);
};

exports.findOne = async (req, res) => {
  const { userId } = req.query;
  const data = await User.findOne(userId);
  // with lean
  data.a = 5;

  //without lean
//   data._doc.a = 5
  return res.status(200).json(data);
};

exports.update = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  User.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name || "Untitled User",
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      online: req.body.online,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
};

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ message: "User deleted successfully" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};
