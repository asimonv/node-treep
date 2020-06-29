module.exports = (sequelize, DataTypes) => {
  const VoteLink = sequelize.define(
    "VoteLink",
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
  return VoteLink;
};
