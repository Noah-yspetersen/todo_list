const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    }
})

// userSchema.pre('save', async function (next) {
//     // If the password has not been modified (just created) call next - which is saving the user (in the route)? Otherwise hash the new password and then save.
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// })

module.exports = mongoose.model('User', userSchema);