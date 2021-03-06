const db = require("../models");
const Subject = db.subject;

module.exports = {
  create : async (req, res) => {
      // Create a Subject
      const subject = new Subject ({
        title: req.body.title
      });
    
      // Save Subject in the database
      await subject
          .save(subject)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the subject."
            });
          });

  },

  findAll : async (req, res) => {
      const title = req.query.title;
      var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

      await Subject.find(condition)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving subjects."
         });
      });
  },

  findOne : async (req, res) => {
    const id = req.params.id;
  
    await Subject.findById(id)
        .then(data => {
          if (!data)
            res.status(404).send({ message: "Not found Subject with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500)
          .send({ message: "Error retrieving Subject with id=" + id });
        });
  },

  update : async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    await Subject.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Subject with id=${id}. Maybe Subject was not found!`
          });
        } else res.send({ message: "Subject was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Subject with id=" + id
        });
      });
  },

  delete : (req, res) => {
    const id = req.params.id;
  
    Subject.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Subject with id=${id}. Maybe Subject was not found!`
          });
        } else {
          res.send({
            message: "Subject was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Subject with id=" + id
        });
      });
  },

  deleteAll : (req, res) => {
    Subject.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Subjects were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all subjects."
        });
      });
  },

  categoryBySubject : async (req, res) => {
     const id = req.params.id;
     
     const subject = await Subject.findById(id).populate('category');

      res.send(subject.category);
  },
  userBySubject : async (req, res) => {
    const id = req.params.id;
    
    const role = await Subject.findById(id).populate('user');

     res.send(subject.user);
 },
};

