module.exports = (sequelize, Sequelize) => {
	return sequelize.define('User', {
		email: {
			type: Sequelize.STRING(255),
			allowNull: false,
			unique: true,
		},
		userpw: {
			type: Sequelize.STRING(16),
			allowNull: false,
		},
		username: {
			type: Sequelize.STRING(255),
			allowNull: true,
		}
	}, {
		timestamps: true,
		paranoid: true,
		charset: 'utf8',
		collate: 'utf8_general_ci',
		tableName: 'user'
	});
	console.log(sequelize, Sequelize);
}