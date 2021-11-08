import { Router } from 'express';
import { userService } from '../services/user';
import { userValidationSchema, userDeleteValidationSchema, userCreateValidationSchema } from '../helpers/userValidators';

const validator = require('express-joi-validation').createValidator({});
const router = Router();

router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    userService.getUserById(id, res);
});

router.put('/user', validator.body(userCreateValidationSchema), (req, res) => {
    userService.createUser(req.body, res);
});

router.delete('/user', validator.body(userDeleteValidationSchema), (req, res) => {
    const { id } = req.body;
    userService.deleteUser(id, res);
});

router.patch('/user', validator.body(userValidationSchema), (req, res) => {
    userService.updateUser(req.body, res);
});

router.get('/user', (req, res) => {
    const { limit, loginSubstring } = req.query;

    if (!loginSubstring) return res.sendStatus(404);
    userService.getUserSuggestions({ limit, loginSubstring }, res);
});
export default router;
