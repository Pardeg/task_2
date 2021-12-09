import { errorHandler } from '../helpers/errorHandler';
import { db } from './../data-access/index';
const jwt = require('jsonwebtoken');

class AuthService {
    loginAuth = async (data: any, res: any) => {
        try {
            const { login, password } = data;
            const user = await db.users.findOne({ where: { LOGIN: login, PASSWORD: password } });
            console.log(process.env.AUTH_KEY);
            if (user) {
                const token = await jwt.sign({ login }, process.env.AUTH_KEY);
                return res.json({ token });
            }
            return res.sendStatus(404);
        } catch (e: any) {
            errorHandler('loginAuth', e.message, data);
            res.sendStatus(401);
        }
    };

    auth = (req: any, res: any, next: any) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            jwt.verify(authHeader, process.env.AUTH_KEY, (err: any, data: any) => {
                console.log(err);
                if (err) return res.sendStatus(403);
                console.log('here');
                next();
            });
        } else {
            res.send(401);
        }
    };
}

export const authService = new AuthService();
