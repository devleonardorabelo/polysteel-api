import express from 'express';
import { AuthRoute, ProductRoute } from './routes';

const app = express();

app.use(express.json());
app.use(AuthRoute, ProductRoute);

app.listen(3000);
