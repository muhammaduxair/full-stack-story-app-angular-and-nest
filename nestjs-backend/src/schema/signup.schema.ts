import * as mongoose from 'mongoose';

export const SignupSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
  },
  createdAt: String,
});
