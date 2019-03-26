module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stress: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentQuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return User;
};
