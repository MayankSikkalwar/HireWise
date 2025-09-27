const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// This function runs BEFORE a new user document is saved
UserSchema.pre('save', async function (next) {
    // We only want to hash the password if it's new or has been changed
    if (!this.isModified('password')) {
        return next();
    }
    
    // Generate a "salt" to make the hash more secure
    const salt = await bcrypt.genSalt(10);
    // Replace the plain text password with the hashed password
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// This adds a method to our User model to compare passwords for login
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);