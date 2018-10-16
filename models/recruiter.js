const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    fio: {
        type: String
    },
    birthday: {
        type: String
    },
    residence: {
        type: String
    },
    telephone: {
        type: String
    },
    skype: {
        type: String
    },
    linkedin: {
        type: String
    },
    place_work: {
        type: String
    },
    time_work_it: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    directions: {
        type: String
    },
    source: {
        type: String
    },
    coop_com: {
        type: String
    },
    school: {
        type: String
    },
    language: {
        type: String
    },
    pay_details: {
        type: String
    },
    divugle: {
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

module.exports = mongoose.model('Recruiter', schema);      