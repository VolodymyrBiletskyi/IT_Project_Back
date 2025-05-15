const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Please provide a valid email address",
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[0-9]{10,15}$/,
        msg: "Please provide a valid phone number",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("specialist", "receptionist", "owner", "admin"),
    allowNull: false,
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetTokenExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "users",  // Explicitly set the table name to lowercase
});

// Hash the password before saving
User.beforeSave(async (user) => {
  console.log("BeforeSave Hook Triggered for user:", user.email);

  if (user.changed("password")) {
    // Prevent hashing an already hashed password
    if (!user.password.startsWith("$2b$")) {
      console.log("Password is changing, hashing now...");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      console.log("New hashed password:", user.password);
    } else {
      console.log("Password is already hashed, skipping re-hash.");
    }
  }
});


// Method to compare provided password with hashed password
User.prototype.comparePassword = async function (password) {
  console.log("Stored password in DB:", this.password);
  console.log("Entered password:", password);
  return await bcrypt.compare(password.trim(), this.password.trim());
};


module.exports = User;