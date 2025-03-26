const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Doctor = sequelize.define("Doctor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctor_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
}, {
  tableName: "doctors",
});

module.exports = Doctor;