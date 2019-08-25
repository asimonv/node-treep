/* eslint no-unused-vars: off, no-await-in-loop: off */

module.exports = function defineVote(sequelize, DataTypes) {
  const Vote = sequelize.define('Vote', {
    voteType: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  Vote.associate = function associate(models) {
    // associations can be defined here
    Vote.hasOne(models.VoteLink, {
      foreignKey: 'VoteId',
      sourceKey: 'id',
      as: 'info',
      onDelete: 'cascade',
      hooks: true,
    });

    const targetModels = [models.Teacher, models.Course];
    targetModels.forEach((Model) => {
      Model.belongsToMany(this, {
        foreignKey: 'foreign_key',
        constraints: false,
        through: {
          model: models.VoteLink,
          unique: false,
          scope: {
            table: Model.name,
          },
        },
      });

      this.belongsToMany(Model, {
        foreign_key: 'VoteId',
        through: {
          model: models.VoteLink,
          unique: false,
        },
      });
    });
  };

  return Vote;
};
