import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../connection';
import Message from './Message';
import Recipient from './Recipient';

export default class Channel extends Model {
    public id!: number;
    public user_id!: number;
    public room_id!: string;
    public type!: number;
    public name!: string;
    public last_message!: string;
    public recipients!: string[];
}

Channel.init({
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
    room_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_message: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 

}, {tableName: 'channels', sequelize});

Channel.hasMany(Message, {foreignKey: 'channel_id', as: 'messages'});
Message.belongsTo(Channel, {foreignKey: 'channel_id', as: 'messages'});

Channel.hasMany(Recipient, {foreignKey: 'channel_id', as: 'recipients'});
Recipient.belongsTo(Channel, {foreignKey: 'channel_id', as: 'recipients'});
