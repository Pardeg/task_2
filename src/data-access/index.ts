import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('users', 'postgres', '1966619666', {
    host: 'localhost',
    dialect: 'postgres'
});

export const db: Record<string, any> = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('../models/users.model.ts')(sequelize, Sequelize);
