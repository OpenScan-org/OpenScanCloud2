import UserService from '../services/user.service.js';
import { validationResult } from 'express-validator';

const UserController = {
    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const user = await UserService.createUser(req.body);
        return res.status(201).json({ message: 'User created', user });
    },

    async getAllUsers(req, res) {
        const users = await UserService.getAllUsers();
        return res.json(users);
    },

    async login(req, res) {
        const token = await UserService.login(req.body);
        if (!token) return res.status(401).json({ message: 'Invalid credentials' });

        return res.json({ token });
    }
};

export default UserController;

