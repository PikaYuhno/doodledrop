import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../connection';

export default class Recipient extends Model {
    public id!: number;
    public user_id!: number;
    public channel_id!: number;
    public username!: string;
    public avatar!: string;
}

Recipient.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    channel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 

}, {tableName: 'recipients', sequelize});
