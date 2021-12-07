import { userService } from './../services/user';
import { Sequelize } from 'sequelize';
import { groupModel } from '../models/groups.model';
import { userModel } from '../models/users.model';
import { userGroups } from '../models/userGroups.model';
const sequelize = new Sequelize('users', 'postgres', '1966619666', {
    host: 'localhost',
    dialect: 'postgres',
    logging:false
});

 export const db: Record<string, any> = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = userModel(sequelize, Sequelize);
db.groups = groupModel(sequelize,Sequelize)
db.usersGroups = userGroups(sequelize,Sequelize)

db.users.belongsToMany(db.groups,{
    through:'userGroups',
    foreignKey:'groupId',

})
db.groups.belongsToMany(db.users,{
    through:'userGroups',
    foreignKey:'userId',

})
