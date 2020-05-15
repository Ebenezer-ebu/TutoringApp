const db = require("../models");
const Role = db.role;
const User = db.user;
const Subject = db.subject;

module.exports = {
    // Retrieve Users If Tutor
    findAll : async (req, res) => {
      const role = req.query.roles;
      var condition = role ? { role: { $regex: new RegExp(role), $options: "i" } } : {};

      await User.find(condition)
          .then(data => {
            res.status(200).send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutors."
         });
      });
  },
    // Retrieve Users If isTutor by Id
    findOne : async (req, res) => {
      const id = req.params.id;
      const role = req.query.roles;
      var condition = role ? { role: { $regex: new RegExp(role), $options: "i" } } : {};

      await User.findById(id, condition)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with id " + id });
          else res.status(200).send(data);
      })
      .catch(err => {
          res.status(500)
        .send({ message: "Error retrieving user with id=" + id });
      });
  },

  findUserRole : async (req, res) => {
    const {userRole} = req.params;

    await User.find().where("roles").equals(userRole)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
        else res.status(200).send(data);
    })
    .catch(err => {
        res.status(500)
      .send({ message: "Error retrieving user with id=" + id });
    });
},

    findByName : async (req, res) => {
      const firstName = req.query.firstname;
      const role = req.query.roles;
      var condition = role ? { role: { $regex: new RegExp(role), $options: "i" } } : {};

      await User.findOne(firstName, condition)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with id " + id });
          else res.status(200).send(data);
      })
      .catch(err => {
          res.status(500)
        .send({ message: "Error retrieving user with id=" + id });
      });
  },



    // Retrieve Users taking a subject
    subjectByUser :  async (req, res) => {
      const id = req.params.id;
      
      const user = await User.findById(id).populate('subject');
  
       res.send(user.subject);
   },

   delete : (req, res) => {
    const id = req.params.id;
    const role = req.query.roles;
    var condition = role ? { role: { $regex: new RegExp(role), $options: "i" } } : {};
  
    User.findByIdAndRemove(id, condition)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
  }
}