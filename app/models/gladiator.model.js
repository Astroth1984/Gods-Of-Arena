module.exports = (sequelize, Sequelize) => {
    const Gladiator = sequelize.define("gladiator", {
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      modifieur: {
        type: Sequelize.ENUM('one-handed sword','two-handed sword','Gladius','dagger')
      }
    });
  
    return Gladiator;
  };
  