
export const groupModel = (sequelize:any,Sequelize:any)=>{
    const GROUPS = sequelize.define('groups',{
        GROUP_ID:{
            type:Sequelize.UUID,
            primaryKey:true,
        },
        NAME:{
            type:Sequelize.TEXT
        },
        PERMISSIONS:{
            type:Sequelize.ARRAY(Sequelize.TEXT)
        }
    })
    return GROUPS
}