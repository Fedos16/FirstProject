const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    recruiter: {
        type: String,
        required: true
    },
    recruiter_id: {
        type: String,
        required: true
    },
    directions: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    messenger: {
        type: String,
        required: true
    },
    social: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    residence: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    experiences: {
        type: String,
        required: true
    },
    w_experiences: {
        type: String,
        required: true
    },
    best_skills: {
        type: String
    },
    portfolio: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    recommendations: {
        type: String
    },
    additional: {
        type: String
    },
    download: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
  },
  {
        timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Worksheets', schema);      