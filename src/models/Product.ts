import { Schema, model } from 'mongoose';
import Category from './Category';

const ProductSchema = new Schema({
  image: String,
  name: String,
  title: String,
  description: String,
  price: String,
  category: {
    type: Object,
    ref: Category,
  },
  characteristics: Object,
});

export default model('Product', ProductSchema);
