const db = require("../models");
const Lesson = db.lesson;

module.exports = {
  create : async (req, res) => {
      // Create a lesson
      const lesson = new Lesson ({
        title: req.body.title
      });
    
      // Save lesson in the database
      await lesson
          .save(subject)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the lesson."
            });
          });

  },

  findAll : async (req, res) => {
      const title = req.query.title;
      var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

      await Lesson.find(condition)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving lessons."
         });
      });
  },

  findOne : async (req, res) => {
    const id = req.params.id;
  
    await Lesson.findById(id)
        .then(data => {
          if (!data)
            res.status(404).send({ message: "Not found lesson with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500)
          .send({ message: "Error retrieving lesson with id=" + id });
        });
  },

  update : async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    await Lesson.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update lesson with id=${id}. Maybe lesson was not found!`
          });
        } else res.send({ message: "Lesson was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Subject with id=" + id
        });
      });
  },

  delete : (req, res) => {
    const id = req.params.id;
  
    Lesson.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete lesson with id=${id}. Maybe lesson was not found!`
          });
        } else {
          res.send({
            message: "Lesson was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete lesson with id=" + id
        });
      });
  },

  deleteAll : (req, res) => {
    Subject.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Lessons were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all lessons."
        });
      });
  },

  lessonBySubject : async (req, res) => {
     const id = req.params.id;
     
     const lesson = await Lesson.findById(id).populate('subject');

      res.send(lesson.subject);
  }
};
