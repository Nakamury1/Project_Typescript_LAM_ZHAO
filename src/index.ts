import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ip from 'ip';
import { UserController } from './controllers/UserController';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userController = new UserController();
app.use('/', userController.router);

app.listen(3000, () => {
    console.log('Server is running http://' + ip.address() + ":3000");
});