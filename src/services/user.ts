import { json } from 'stream/consumers';
import { db } from '../data-access';
import { v4 as uuidv4 } from 'uuid';
import Sequelize from 'sequelize';

class UserService {
    getUserById = async (id: string, res: any) => {
        try {
            console.log(id);
            const user = await db.users.findOne({ where: { USER_ID: Number(id), DELETED: false } });
            const {
                dataValues: { LOGIN: login, AGE: age }
            } = user;
            return res.json({ data: { login, age } });
        } catch (e) {
            res.sendStatus(404);
        }
    };

    createUser = async ({ login, age, password }: any, res: any) => {
        try {
            const data = await db.users.create({ USER_ID: uuidv4(), PASSWORD: password, AGE: age, LOGIN: login });
            const {
                dataValues: { DELETED, ...restFields }
            } = data;

            return res.json({ data: { ...restFields } });
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    };

    deleteUser = async (id: any, res: any) => {
        try {
            await db.users.update({ DELETED: true }, { where: { USER_ID: id } });
            res.json('User Deleted');
        } catch (e) {
            console.log(e);
            res.send(404);
        }
    };

    updateUser = async (data: any, res: any) => {
        try {
            const { id, login, password, age } = data;
            const [ok] = await db.users.update({ LOGIN: login, PASSWORD: password, AGE: age }, { where: { USER_ID: id, DELETED: false } });
            if (ok === 1) return res.json('User updated');
            res.sendStatus(404);
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    };

    getUserSuggestions = async ({ limit, loginSubstring }: any, res: any) => {
        try {
            const data = await db.users.findAll({ where: { LOGIN: { [Sequelize.Op.substring]: loginSubstring }, DELETED: false } });
            if (data && data.length > 0) {
                const response = data
                    .sort((el1: any, el2: any) => (el1.LOGIN > el2.LOGIN ? 1 : -1))
                    .slice(0, limit)
                    .map((el: any) => el.LOGIN);

                return res.json(response);
            }

            return res.sendStatus(404);
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    };
}

export const userService = new UserService();
