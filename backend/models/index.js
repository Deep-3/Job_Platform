const Sequelize = require('sequelize');
const sequelize= require('../config/db'); 


const User = require('./user')(sequelize, Sequelize.DataTypes);
const JobSeekerProfile= require('./jobseekerprofile')(sequelize, Sequelize.DataTypes);



const db = {
  User,
  JobSeekerProfile,
  sequelize,
  Sequelize,
};
User.hasOne(JobSeekerProfile, {
  foreignKey: 'userId',
  as: 'jobSeekerProfile',
  onDelete: 'CASCADE'
});
JobSeekerProfile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = db;
