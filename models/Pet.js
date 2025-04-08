const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pet = sequelize.define("Pet", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER, // Ensure this is defined
    allowNull: true, // Allow null if age is optional
  },
  owner_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",  // Reference the users table
      key: "id",       // Reference the id column
    },
  },
  gender: {
    type: DataTypes.ENUM("male", "female"),
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "pets",  // Explicitly set the table name to lowercase
});

module.exports = Pet;