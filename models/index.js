const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.HashTag = require('./HashTag')(sequelize, Sequelize);


// 1 대 다
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

// 다 대 다
db.Post.belongsMany(db.HashTag, {through: 'post_hashtag'});
db.HashTag.belongsMany(db.Post, {through: 'post_hashtag'});

db.User.belongsMany(db.User, {through: 'follow', foreignKey: 'following_id', as: 'followers'});
db.User.belongsMany(db.User, {through: 'follow', foreignKey: 'follower_id', as: 'followings'});

module.exports = db;
