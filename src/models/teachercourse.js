/*  eslint no-unused-vars: ["error", { "args": "none" }]  */

module.exports = function defineTeacherCourse(sequelize, DataTypes) {
  const TeacherCourse = sequelize.define('TeacherCourse', {
    courseName: DataTypes.STRING,
    teacherId: DataTypes.INTEGER,
  });
  TeacherCourse.associate = function associate(models) {
    // associations can be defined here
  };

  return TeacherCourse;
};
