import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Worker = sequelize.define('Worker', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('idle', 'processing', 'offline', 'error'),
        allowNull: false,
        defaultValue: 'idle'
    },
    last_seen: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    jobs_completed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    current_project_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Job',
            key: 'id'
        }
    },
    assigned_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    timestamps: true
});

export default Worker;
