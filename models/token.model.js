const { Schema, model } = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true, // Ensure each token is unique
    },
    status: {
        type: String,
        enum: ['valid', 'blacklisted'],
        default: 'valid',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

tokenSchema.plugin(toJSON)
tokenSchema.plugin(paginate)

const Token = model('Token', tokenSchema);

module.exports = Token;