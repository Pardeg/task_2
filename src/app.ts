import express from 'express';
import { db } from './data-access';
import api from './router/userRoutes';
import groupRoutes from './router/groupRoutes'

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
db.sequelize.sync({ forced: true });
app.use(api);
app.use(groupRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
