module.exports = (sequelize, DataTypes) => {
  const CommentLink = sequelize.define(
    "CommentLink",
    {
      table: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      foreign_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );
  return CommentLink;
};
