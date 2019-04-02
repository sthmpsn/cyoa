module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
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
      defaultValue: 20
    },
    currentStress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20
    },
    highScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    highStress: {
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
