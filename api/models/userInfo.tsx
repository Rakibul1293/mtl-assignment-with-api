const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    textField: { type: String, required: true },
    image: { type: mongoose.Schema.Types.Mixed, required: true },
    selectedVal: { type: String, required: true }
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
