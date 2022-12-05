import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

export { User };
