const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Specialist = sequelize.define('Specialist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(50),
    defaultValue: 'doctor',

  },
}, {
  tableName: 'specialists',
  timestamps: true,
});

module.exports = Specialist;