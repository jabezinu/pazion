import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

export default mongoose.model('Equipment', equipmentSchema);