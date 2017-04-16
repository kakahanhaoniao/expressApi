let mongoose = require('../mongoConfig')
let Schema = mongoose.Schema

let UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    creat_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    is_delete: Boolean
})

let User = mongoose.model('User', UserSchema)

module.exports = User
