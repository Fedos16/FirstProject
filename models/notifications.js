const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    residence_country: {
        type: String
    },
    residence_city: {
        type: String
    },
    directions: {
        type: Array
    },
    level: {
        type: Array
    },
    skills: {
        type: Array
    },
    language: {
        type: Array
    },
    email: {
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

module.exports = mongoose.model('Notifications', schema);      