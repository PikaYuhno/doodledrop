import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../connection';

export default class Channel extends Model {
    public id!: number;
    public name!: string;
}

Channel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {tableName: 'channels', sequelize});
