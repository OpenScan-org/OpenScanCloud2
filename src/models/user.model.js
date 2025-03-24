import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

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
    quality: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5
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
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

// Setup associations method
User.setupAssociations = (models) => {
    // Add cascading associations
    User.hasMany(models.Job, { 
        foreignKey: 'userId', 
        onDelete: 'CASCADE' 
    });
    
    User.hasMany(models.ApiKey, { 
        foreignKey: 'userId', 
        onDelete: 'CASCADE' 
    });
};

export default User;
