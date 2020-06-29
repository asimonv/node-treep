const db = require("../models");

// const getStats = async () => [
//   {
//     statType: 1,
//     title: 'Stats soon...',
//   },
// ];

const getStats = async () => [
  {
    statType: 0,
    image:
      "https://assets-ouch.icons8.com/preview/781/61f24427-f2dd-4ef8-8b50-4881e1ca5c69.png",
    title: "Top teachers",
    subtitle: "Based on a certain factor.",
    url: "teachers",
    id: "top-teachers",
    description:
      "There's no much to say. Treep calculates which teacher is better based on his/her/etc popularity, knowledge and disposition which results in a certain factor. The higher, the better!\n\nHere are the results:",
  },
  {
    statType: 0,
    image:
      "https://assets-ouch.icons8.com/preview/388/9f4d0a7d-994f-4d68-b806-33692b39a5a7.png",
    title: "Top courses",
    subtitle: "Based on popularity, difficulty and other attributes.",
    url: "courses",
    id: "top-courses",
    description:
      "There's no much to say. Treep calculates which course is better based on a certain factor. The higher, the better!\n\nHere are the results:",
  },
  {
    statType: 0,
    image:
      "https://assets-ouch.icons8.com/preview/445/9ac0a392-3627-4f27-8024-ce999cb62017.png",
    title: "Top theological courses",
    subtitle: "Choose the best 🙏🛐🌟",
    url: "teologicos",
    id: "top-teologicos",
  },
  {
    statType: 1,
    title: "More stats coming soon...",
  },
];

const getBestTeachers = async () => {
  const teachers = db.Teacher.findAll({
    order: [["factor", "DESC"]],
    limit: 10,
  });
  return teachers;
};

const getBestCourses = async () => {
  const teachers = db.Course.findAll({
    order: [["factor", "DESC"]],
    limit: 10,
  });
  return teachers;
};

const getBestTeologicos = async (filter = undefined) => {
  const courses = db.Course.findAll({
    where: { ua: "Teología" },
    order: [["factor", "DESC"]],
    limit: 10,
  });

  return courses;
};

module.exports = {
  getStats,
  getBestTeachers,
  getBestCourses,
  getBestTeologicos,
};
