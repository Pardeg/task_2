import { Router } from 'express';
import { authService } from '../services/auth';
import { loginValidationSchema } from '../helpers/userValidators';

const validator = require('express-joi-validation').createValidator({});
const router = Router();

router.post('/login', validator.body(loginValidationSchema), (req, res) => {
    const data = req.body;
    authService.loginAuth(data, res);
});

export default router;
