const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    recruiter: {
        type: String
    },
    recruiter_id: {
        type: String
    },
    directions: {
        type: String
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
        type: String
    },
    data_messenger: {
        type: String
    },
    social: {
        type: String
    },
    linkedin: {
        type: String
    },
    residence_country: {
        type: String
    },
    residence_city: {
        type: String
    },
    flag_path: {
        type: String
    },
    relocate: {
        type: String
    },
    level: {
        type: String
    },
    salary: {
        type: String
    },
    experiences: {
        type: String
    },
    w_experiences: {
        type: String
    },
    best_skills: {
        type: String
    },
    portfolio: {
        type: String
    },
    language: {
        type: String
    },
    recommendations: {
        type: String
    },
    additional: {
        type: String
    },
    download: {
        type: String
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