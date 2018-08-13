const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        direction: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        contact: {
            type: String
        },
        linkedin: {
            type: String
        },
        residence: {
            type: String
        },
        level: {
            type: String
        },
        salary: {
            type: String
        },
        experience: {
            type: String
        },
        workExperience: {
            type: String
        },
        bestSkills: {
            type: String
        },
        language: {
            type: String
        },
        download: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('TestSheet', schema);      