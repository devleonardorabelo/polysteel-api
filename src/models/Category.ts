import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  id: String,
  image: String,
  name: String,
});

export default model('Category', CategorySchema);
