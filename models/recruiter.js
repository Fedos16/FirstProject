const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    fio: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    education: {
        type: String
    },
    languages: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    skype: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    it_work: {
        type: String,
        required: true
    },
    last_work: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    recommendations: {
        type: String,
        required: true
    },
    requisites: {
        type: String
    },
    directions: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
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

module.exports = mongoose.model('Recruiter', schema);      