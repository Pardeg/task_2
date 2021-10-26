import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
const validator = require('express-joi-validation').createValidator({});

const querySchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required().min(5).alphanum(),
    age: Joi.number().required().greater(4).less(130)
});

const app = express();
const PORT = process.env.port || 4000;
const dataBase = [{ id: '123', login: 'abc', password: '123', age: 123, isDeleted: false }];

type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};
app.use(express.json());

app.listen(PORT, () => {
    console.log('server running');
});

app.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    if (!userId) res.sendStatus(404);

    const user = dataBase.find((el) => el.id === userId && el.isDeleted !== true);

    if (user) {
        return res.send(user);
    }

    res.sendStatus(404);
});

app.get('/user', (req, res) => {
    const { limit, loginSubstring } = req.query;
    console.log(limit, loginSubstring);
    if (limit && loginSubstring) {
        const filteredUsers = dataBase
            .filter(({ login }) => login.toLowerCase().includes(loginSubstring.toString().toLowerCase()))
            .sort((a, b) => (a.login > b.login ? 1 : -1))
            .slice(0, Number(limit))
            .map(({login}) => login);
        console.log(filteredUsers);
        res.send(filteredUsers);
    }
});
app.delete('/user/:userId', (req, res) => {
    const { userId } = req.params;
    dataBase.forEach((el) => {
        if (el.id === userId) {
            el.isDeleted = true;
            return res.send('User Deleted');
        }
    });
});

app.put('/user', validator.body(querySchema), (req, res) => {
    const { login, password, age } = req.body;

    const newUser = { login, password, age: Number(age), isDeleted: false, id: uuidv4() };

    dataBase.push(newUser);

    res.send(`User ${login} created`);
});

app.put('/user/:userId', validator.body(querySchema), (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    const { login, password, age } = req.body;

    dataBase.forEach((el) => {
        if (el.id === userId) {
            el.login = login;
            el.password = password;
            el.age = age;
            return res.send('ok');
        }
    });
});
