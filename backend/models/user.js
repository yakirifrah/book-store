const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.havePermission = async function (candidateRole, role) {
  return await candidateRole.localeCompare(role);
};

module.exports = mongoose.model('User', userSchema);
