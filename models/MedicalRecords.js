const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicalRecord = sequelize.define('MedicalRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  pet_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Pets',
      key: 'id',
    },
  },
  medical_information: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
  },
  allergies: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
  },
  previous_diagnoses: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
  },
  prescriptions: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
  },
}, {
  tableName: 'medical_records',
});

module.exports = MedicalRecord;