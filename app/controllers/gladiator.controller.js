const db = require("../models");
const Gladiator = db.gladiators;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const gladiator = {
    name: req.body.name,
    type: req.body.type,
    modifieur: req.body.modifieur
  };

  // Save Tutorial in the database
  Gladiator.create(gladiator)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Gladiator."
      });
    });
  
};


exports.findAll = (req, res) => {

  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Gladiator.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving gladiators."
      });
    });
  
};


exports.findOne = (req, res) => {

  const id = req.params.id;

  Gladiator.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Gladiator with id=" + id
      });
    });
  
};


exports.update = (req, res) => {

  const id = req.params.id;

  Gladiator.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Gladiator was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Gladiator with id=${id}. Maybe Gladiator was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Gladiator with id=" + id
      });
    });
  
};


exports.delete = (req, res) => {
    
  const id = req.params.id;

  Gladiator.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Gladiator was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Gladiator with id=${id}. Maybe Gladiator was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Gladiator with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {

    Gladiator.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Gladiator were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all gladiators."
          });
    });
  
};


