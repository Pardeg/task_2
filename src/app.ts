import express from 'express';
import { db } from './data-access';
import api from './router/userRoutes';
import groupRoutes from './router/groupRoutes';

const winston = require('winston');
const winstonExpress = require('express-winston');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
db.sequelize.sync({ forced: true });
app.use(api);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
app.use(
    winstonExpress.logger({
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
        transports: [new winston.transports.Console()],
        msg: 'LOGGER',
        meta:false,
        colorize:true
    })
);
app.use((err:any,req:any,res:any,next:any)=>{
    console.error(err.stack)
    res.sendStatus(500).send('Something wrong')
})

app.use(groupRoutes);
