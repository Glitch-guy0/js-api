import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  password: {
    type: String,
    minLength: 8,
    maxLength:20,
  },
  OAuth: {
    key: {
      type: String
    },
    expiry: {
      type: Date
    }
  },
  session: {
    token: String,
    expiry: Date
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;