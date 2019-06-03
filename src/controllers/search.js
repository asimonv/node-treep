const db = require('../models');

const search = async (q) => {
  const courses = await db.Course.findAll({
    where: {
      $or: [
        {
          courseNumber: {
            $ilike: `%${q}%`,
          },
        },
        {
          name: {
            $ilike: `%${q}%`,
          },
        },
        {
          englishName: {
            $ilike: `%${q}%`,
          },
        },
      ],
    },
    limit: 10,
  });

  const teachers = await db.Teacher.findAll({
    where: {
      name: {
        $ilike: `%${q}%`,
      },
    },
    limit: 10,
  });

  return { courses, teachers };
};

module.exports = {
  search,
};
