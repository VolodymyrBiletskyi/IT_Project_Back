const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Specialist = sequelize.define('Specialist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'specialists',
  timestamps: true,
});

module.exports = Specialist;