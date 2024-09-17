const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  maxReservations: {
    type: Number,
    required: true,
  },
  reservedCount: {
    type: Number,
    default: 0,
  },
  reservedBy: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }]
});

classSchema.methods.removeReservation = function(userId) {
  return this.model('Class').findOneAndUpdate(
    { _id: this._id },
    { $pull: { reservedBy: userId } },
    { new: true }
  );
};

module.exports = mongoose.model('Class', classSchema);