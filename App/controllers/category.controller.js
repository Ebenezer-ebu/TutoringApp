const db = require("../models");
const Category = db.category;

module.exports = {
  create : async (req, res) => {
      // Create a Category
      const category = new Category ({
        title: req.body.title
      });
    
      // Save Category in the database
      await category
          .save(category)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the category."
            });
          });

  },

  findAll : async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    await Category.find(condition)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
      });
    });
  },

  findOne : async (req, res) => {
    const id = req.params.id;
  
    await Category.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Category with id " + id });
          else res.send(data);
      })
      .catch(err => {
        res.status(500)
        .send({ message: "Error retrieving Category with id=" + id });
      });
  },

  update : async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    await Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Category with id=${id}. Maybe Category was not found!`
          });
        } else res.send({ message: "Category was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id=" + id
        });
      });
  },

  delete : (req, res) => {
    const id = req.params.id;
  
    Category.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
          });
        } else {
          res.send({
            message: "Category was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Category with id=" + id
        });
      });
  },

  deleteAll : (req, res) => {
    Category.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Categories were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all categories."
        });
      });
  }
};

