import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserService = {
    async createUser({ username, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await User.create({ username, email, password: hashedPassword });
    },

    async getAllUsers() {
        return await User.findAll({ attributes: ['id', 'username', 'email'] });
    },

    async login({ email, password }) {
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) return null;

        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
};

export default UserService;

