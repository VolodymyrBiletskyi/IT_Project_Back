const crypto = require("crypto");
const User = require("../models/User");
const transporter = require("../controllers/mailer");
const { Op } = require("sequelize");

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = new Date(Date.now() + 3600000); // Valid time 1 hour
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: http://localhost:/auth/reset-password?token=${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  try {
    console.log(token);
    const user = await User.findOne({
      where: { resetToken: token }
    });
    const userWithDateCheck = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: { [Op.gt]: new Date() } // Expire check
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.json({ message: "Password has been reset successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { requestPasswordReset, resetPassword };
