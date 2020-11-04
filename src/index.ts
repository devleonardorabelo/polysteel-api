import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { AuthRoute, ProductRoute, PaymentRoute } from './routes';

dotenv.config();
const app = express();

connect(process.env.BD, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
app.use(AuthRoute, ProductRoute, PaymentRoute);

app.listen(3000);
