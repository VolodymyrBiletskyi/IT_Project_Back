const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  pet_id: {
    type: DataTypes.UUID,
    allowNull: true, // Allow NULL values
  },
  service_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  specialist_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Canceled'),
    defaultValue: 'Pending',
  },
}, {
  tableName: 'appointments',
  timestamps: true,
});

module.exports = Appointment;