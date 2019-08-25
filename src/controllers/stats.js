const db = require('../models');

const getStats = async () => [
  {
    statType: 0,
    image: 'https://assets-ouch.icons8.com/preview/781/61f24427-f2dd-4ef8-8b50-4881e1ca5c69.png',
    title: 'Top teachers',
    subtitle: 'Based on a certain factor.',
    url: 'teachers',
    id: 'top-teachers',
    description:
      "There's no much to say. Treep calculates which teacher is better based on his/her/etc popularity, knowledge and disposition which results in a certain factor. The higher, the better!\n\nHere are the results:",
  },
  {
    statType: 1,
    title: 'More stats 🔜. See you later 🐊.',
  },
];

/*
{
  image: 'https://assets-ouch.icons8.com/preview/695/d251cbc9-cf3f-496c-a115-d6e8b8909345.png',
  title: 'Top courses',
  subtitle: 'Based on popularity and difficulty and other attributes.',
  url: 'courses',
  id: 'top-courses',
},
{
  image: 'https://assets-ouch.icons8.com/preview/283/fa86f902-1195-444e-8a85-b20d7c592d62.png',
  title: 'Top theological courses',
  subtitle: 'Choose the best 🙏🛐🌟',
  url: 'teologicos',
  id: 'top-teologicos',
},
*/

const getBestTeachers = async () => {
  const teachers = db.Teacher.findAll({
    limit: 10,
  });
  return teachers;
};

module.exports = {
  getStats,
  getBestTeachers,
};
