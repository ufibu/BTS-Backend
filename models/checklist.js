const { Schema, model } = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const checklistItemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const checklistSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    items: [checklistItemSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
}, { timestamps: true });

checklistSchema.plugin(toJSON);
checklistSchema.plugin(paginate);

const Checklist = model('Checklist', checklistSchema);

module.exports = Checklist;