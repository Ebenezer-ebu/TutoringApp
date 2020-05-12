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

  categoryBySubject : async (req, res) => {
     const id = req.params.id;
     
     const subject = await Subject.findById(id).populate('category');

      res.send(subject.category);
  }
};

