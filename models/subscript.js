const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    email: {
        type: String
    },
    status: {
        type: Boolean
    }
  },
  {
        timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Subscript', schema);      