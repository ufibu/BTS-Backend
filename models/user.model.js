const { Schema, model } = require("mongoose");
const { toJSON, paginate, } = require("./plugins");
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
})

const User = model('User', userSchema);

module.exports = User;