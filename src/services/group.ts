import { json } from 'stream/consumers';
import { userGroups } from './../models/userGroups.model';
import { db } from '../data-access';
import { v4 as uuidv4 } from 'uuid';
import Sequelize from 'sequelize';

class GroupService {
    basePremissions: string[];
    constructor() {
        this.basePremissions = ['WRITE', 'READ', 'DELETE', 'SHARE', 'UPLOAD_FILES'];
    }

    createGroup = async (name: string, res: any) => {
        try {
            await db.groups.create({ GROUP_ID: uuidv4(), NAME: name, PERMISSIONS: this.basePremissions });
            res.json(`Group ${name} created`);
        } catch (e) {
            res.sendStatus(500);
        }
    };

    getGroupById = async (id: string, res: any) => {
        try {
            const { NAME } = await db.groups.findOne({ where: { GROUP_ID: id } });
            res.json(NAME);
        } catch (e) {
            res.sendStatus(404);
        }
    };

    updateGroupInfo = async (data: any, res: any) => {
        try {
            const { id, name } = data;
            await db.groups.update({ NAME: name }, { where: { GROUP_ID: id } });
            res.json('Updated');
        } catch (e) {
            res.sendStatus(404);
        }
    };

    deleteGroup = async (id: string, res: any) => {
        try {
            await db.groups.destroy({ where: { GROUP_ID: id } });
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(400);
        }
    };

    getAllGroups = async (res: any) => {
        try {
            const allGroups = await db.groups.findAll();
            if (allGroups?.length > 0) {
                const sorted = allGroups.map((el: any) => el.NAME);
                res.json(sorted);
            }
            res.sendStatus(404);
        } catch (e) {
            res.sendStatus(404);
        }
    };

    addUsersToGroup = async (groupId: any, usersList: any, res: any) => {
        const transaction = await db.sequelize.transaction();

        const group = await db.groups.findByPk(groupId, { transaction });
        const users = await db.users.findAll({ where: { USER_ID: usersList, DELETED: false }, transaction });
        try {
            if (!group || !users) return res.sendStatus(404).json('dont find group or user');

            const userGroups = await db.usersGroups.bulkCreate(
                users.map((el: any) => {
                    return { id: uuidv4(), groupId: group.GROUP_ID, userId: el.USER_ID };
                }),
                { transaction }
            );
            await transaction.commit();

            return res.json('Ok');
        } catch (e) {
            await transaction.rollback();
            console.log(e);
            return res.sendStatus(500);
        }
    };
}

export const groupService = new GroupService();
