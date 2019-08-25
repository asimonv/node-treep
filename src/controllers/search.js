const db = require('../models');
const _ = require('lodash');

const search = async (q) => {
  let courses = await db.Course.findAll({
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

  courses = _.chain(courses.map(x => x.toJSON()))
    .map(x => ({
      ...x,
      name: `${x.courseNumber} - ${x.name}`,
    }))
    .value();

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
