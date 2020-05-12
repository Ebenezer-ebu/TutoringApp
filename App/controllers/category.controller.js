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

  subjectByCategory : async (req, res) => {
     const id = req.params.id;
     
     const category = await Subject.findById(id).populate('subject');

      res.send(category.subject);
  }
}

