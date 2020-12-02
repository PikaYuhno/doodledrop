import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../connection/';

export default class Follower extends Model {
    public id!: number;
    public user_id!: number;
    public follower_id!: number;
}

Follower.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {tableName: "followers", sequelize}
);

//Follower.sync();
