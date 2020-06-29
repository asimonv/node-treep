module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    courseNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    ua: DataTypes.STRING,
    description: DataTypes.TEXT,
    englishName: DataTypes.TEXT,
    factor: DataTypes.DOUBLE,
  });

  Course.associate = function associate(models) {
    // associations can be defined here
    Course.hasMany(models.TeacherCourse, {
      foreignKey: "courseName",
      sourceKey: "courseNumber",
    });
  };

  return Course;
};
