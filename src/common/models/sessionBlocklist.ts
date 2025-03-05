import mongoose from 'mongoose';

const sessionBlocklistSchema = new mongoose.Schema({
  sessionkey: {
    type: String,
    required: true,
    unique: true,
  },
  expiry: {
    type: Date,
    default: Date.now,
    index: { expires: '1h' },
  },

});

const sessionBlocklist = mongoose.models.sessionBlocklist || mongoose.model('sessionBlocklist', sessionBlocklistSchema);

export default sessionBlocklist