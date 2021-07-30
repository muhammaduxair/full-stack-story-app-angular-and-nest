import * as mongoose from 'mongoose';

export const StorySchema = new mongoose.Schema({
  title: String,
  description: String,
  visibility: String,
  createdAt: String,
  user_id: String,
  user_name: String,
});
