
export const userGroups = (sequelize: any, Sequelize: any) => {
    const UserGroups = sequelize.define('userGroups', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
       userId: {
            type: Sequelize.UUID
        },
       groupId: {
            type: Sequelize.UUID
        }
    });


    return UserGroups;
};
