module.exports = (sequelize, Sequelize) => {
	sequelize.define('HashTag', {
		title: {
			type: Sequelize.STRING(50),
			allowNull: false,
			unique: true,
		},
	}, {
		timestamps: true,
		paranoid: true,
		charset: 'utf8',
		collate: 'utf8_general_ci',
		tableName: 'hashtag'
	});
}