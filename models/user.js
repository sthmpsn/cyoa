module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    },
    currentScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    currentStress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    finalScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    finalStress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    currentQuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });
  return User;
};
