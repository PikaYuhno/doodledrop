import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../connection';

export default class Notification extends Model {
    public id!: number;
    public user_id!: number;
    public doodle_id!: number;
    public content!: string;
    public notif_type!: number;
    public read!: boolean;
    public timestamp!: Date;
}

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    doodle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notif_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {tableName: 'notifications', sequelize});