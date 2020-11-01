import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  image: String,
  name: String,
});

export default model('Category', CategorySchema);
