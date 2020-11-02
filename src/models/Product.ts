import { Schema, model } from 'mongoose';
import Category from './Category';

const ProductSchema = new Schema({
  id: String,
  image: String,
  name: String,
  title: String,
  description: String,
  category: {
    type: Object,
    ref: Category,
  },
  characteristics: Object,
});

export default model('Product', ProductSchema);
