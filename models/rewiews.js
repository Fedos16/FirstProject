const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    fio: {
        type: String
    },
    company: {
        type: String
    },
    position: {
        type: String
    },
    rewiew: {
        type: String
    },
    image_path: {
        type: String
    },
    status: {
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

module.exports = mongoose.model('Rewiews', schema);      