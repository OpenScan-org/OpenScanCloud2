import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    project_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filesize: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    photos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parts: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quality: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rec_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    masking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    texture: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    expire: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('uploaded', 'processing', 'finished', 'error'),
        allowNull: false,
        defaultValue: 'uploaded'
    },
    credit_used: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    dlink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    objecttype: {
        type: DataTypes.STRING,
        allowNull: true
    },
    processtype: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

export default Job;
