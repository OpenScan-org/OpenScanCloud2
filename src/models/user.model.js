import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Job from './job.model.js';
import ApiKey from './apiKey.model.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    limit_filesize: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 2000000000
    },
    limit_photos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20000
    },
    texture: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    credit: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    usergroup: {
        type: DataTypes.ENUM('default', 'premium', 'admin'),
        allowNull: false,
        defaultValue: 'default'
    },
    quality: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5
    }
}, {
    timestamps: true
});

// Ensure cascading delete on jobs and API keys when a user is deleted
User.hasMany(Job, { foreignKey: 'userId', onDelete: 'CASCADE' });
Job.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ApiKey, { foreignKey: 'userId', onDelete: 'CASCADE' });
ApiKey.belongsTo(User, { foreignKey: 'userId' });

export default User;
