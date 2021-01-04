import {Model, DataTypes, NOW} from 'sequelize';
import {sequelize} from '../connection';

export default class Message extends Model {
    public id!: number;
    public channel_id!: number;
    public user_id!: number;
    public receiver_id!: number
    public room_id!: string;
    public body!: string;
    public read!: boolean;
    public created_at!: Date;
}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }, room_id: {
         type: DataTypes.UUID,
         allowNull: false,
    }, user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, body: {
        type: DataTypes.TEXT,
        allowNull: false,
    }, 
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW
    }
}, {sequelize, tableName: 'messages'});
