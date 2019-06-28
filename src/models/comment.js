/*  eslint no-unused-vars: ["error", { "args": "none" }]  */

module.exports = function defineComment(sequelize, DataTypes) {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );

  //  taken from here:
  //  https://medium.com/@Abazhenov/polymorphic-associations-in-postgres-sequelize-9f3d6c3857fb
  Comment.associate = function associate(models) {
    // associations can be defined here
    Comment.hasOne(models.CommentLink, {
      foreignKey: 'CommentId',
      sourceKey: 'id',
      as: 'info',
    });
    const targetModels = [models.Teacher, models.Course];
    targetModels.forEach((Model) => {
      Model.belongsToMany(this, {
        foreignKey: 'foreign_key',
        constraints: false,
        through: {
          model: models.CommentLink,
          unique: false,
          scope: {
            table: Model.name,
          },
        },
      });

      this.belongsToMany(Model, {
        foreign_key: 'CommentId',
        through: {
          model: models.CommentLink,
          unique: false,
        },
      });
    });
  };

  return Comment;
};
