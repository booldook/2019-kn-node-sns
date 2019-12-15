module.exports = (sequelize, Sequelize) => {
	sequelize.define('Post', {
		comment: {
			type: Sequelize.STRING(140),
			allowNull: false,
		},
		img: {
			type: Sequelize.STRING(255),
			allowNull: true,
		},
	}, {
		timestamps: true,
		paranoid: true,
		charset: 'utf8',
		collate: 'utf8_general_ci',
		tableName: 'post'
	});
}