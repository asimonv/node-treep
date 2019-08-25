module.exports = function defineTeacher(sequelize, DataTypes) {
  const Teacher = sequelize.define('Teacher', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
  });

  Teacher.associate = function associate(models) {
    // associations can be defined here
    Teacher.hasMany(models.TeacherCourse, { foreignKey: 'teacherId', sourceKey: 'id' });
  };

  Teacher.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  };

  //  again, my db/web teachers'd be very dissapointed :(
  Teacher.prototype.getStats = async function getStats() {
    const query = `
    SELECT
      count(Votes."voteType" = 0 OR NULL) AS votes_popularity,
      count(Votes."voteType" = 1 OR NULL) AS votes_knowledge,
      count(Votes."voteType" = 2 OR NULL) AS votes_clarity,
      count(Votes."voteType" = 3 OR NULL) AS votes_demand,
      count(Votes."voteType" = 4 OR NULL) AS votes_disposition,
      COALESCE(NULLIF(cast(sum ( case when Votes."voteType" = 0 then Votes.value else 0 end) as float) / COALESCE(NULLIF(count(Votes."voteType" = 0 OR NULL),0), 1), 0), 0) as popularity,
      COALESCE(NULLIF(cast(sum ( case when Votes."voteType" = 1 then Votes.value else 0 end) as float) / COALESCE(NULLIF(count(Votes."voteType" = 1 OR NULL),0), 1), 0), 0) as knowledge,
      COALESCE(NULLIF(cast(sum ( case when Votes."voteType" = 2 then Votes.value else 0 end) as float) / COALESCE(NULLIF(count(Votes."voteType" = 2 OR NULL),0), 1), 0), 0) as clarity,
      COALESCE(NULLIF(cast(sum ( case when Votes."voteType" = 3 then Votes.value else 0 end) as float) / COALESCE(NULLIF(count(Votes."voteType" = 3 OR NULL),0), 1), 0), 0) as demand,
      COALESCE(NULLIF(cast(sum ( case when Votes."voteType" = 4 then Votes.value else 0 end) as float) / COALESCE(NULLIF(count(Votes."voteType" = 4 OR NULL),0), 1), 0), 0) as disposition
    FROM
      Votes
    WHERE
      Votes."teacherId" = :teacherId;
    `;

    return sequelize.query(query, {
      raw: true,
      replacements: {
        teacherId: this.id,
      },
    });
  };

  return Teacher;
};
