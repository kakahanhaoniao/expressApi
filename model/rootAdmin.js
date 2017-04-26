let mongoose = require('../mongoConfig');
let Schema = mongoose.Schema;

let RootUserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    creat_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    is_delete: Boolean
});

let RootUser = mongoose.model('RootUser', RootUserSchema);

module.exports = RootUser;
