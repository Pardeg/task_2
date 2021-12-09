import { Router } from 'express';
import { userService } from '../services/user';
import { userValidationSchema, userDeleteValidationSchema, userCreateValidationSchema } from '../helpers/userValidators';
import { authService } from '../services/auth';

const validator = require('express-joi-validation').createValidator({});
const router = Router();

router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    userService.getUserById(id, res);
});

router.put('/user', [validator.body(userCreateValidationSchema), authService.auth], (req: any, res: any) => {
    userService.createUser(req.body, res);
});

router.delete('/user', [validator.body(userDeleteValidationSchema), authService.auth], (req: any, res: any) => {
    const { id } = req.body;
    userService.deleteUser(id, res);
});

router.patch('/user', [validator.body(userValidationSchema), authService.auth], (req: any, res: any) => {
    userService.updateUser(req.body, res);
});

router.get('/user', authService.auth, (req, res) => {
    const { limit, loginSubstring } = req.query;

    if (!loginSubstring) return res.sendStatus(404);
    userService.getUserSuggestions({ limit, loginSubstring }, res);
});
export default router;
