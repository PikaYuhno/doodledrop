import {Model, DataTypes, NOW} from 'sequelize';
import {sequelize} from '../connection';

export default class Message extends Model {
    public id!: number;
    public channel_id!: number;
    public user_id!: number;
    public body!: string;
    public created_at!: Date;
}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }, channel_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
    }, user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, body: {
        type: DataTypes.TEXT,
        allowNull: false,
    }, created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW
    }
}, {sequelize, tableName: 'messages'});
