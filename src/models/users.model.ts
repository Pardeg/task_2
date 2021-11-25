
export const userModel = (sequelize:any, Sequelize:any) => {
    const USERS = sequelize.define("users", {
      USER_ID: {
        type: Sequelize.UUID,
        primaryKey:true,
      },
      LOGIN: {
        type: Sequelize.STRING
      },
      PASSWORD: {
        type: Sequelize.STRING
      },
      AGE: {
        type: Sequelize.INTEGER
      },
      DELETED: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      }
    },{
      timestamps:false
    });
  
    return USERS;
  };