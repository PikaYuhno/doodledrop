import {Model, DataTypes} from "sequelize";
import {sequelize} from "../connection";
import Doodle from "./Doodle";
import Comment from "./Comment";
import Follower from './Follower';
import Message from "./Message";
import Channel from "./Channel";

export default class User extends Model {
    public id!: number;
    public username!: string;
    public first_name!: string;
    public last_name!: string;
    public password!: string;
    public email!: string;
    public created_doodles!: number;
    public avatar!: string;
    public bio!: string;
    public location!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_doodles: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "default-1.png",
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "users",
        sequelize: sequelize,
    }
);

// User has many Doodles through user_id
User.hasMany(Doodle, {foreignKey: "user_id",});
Doodle.belongsTo(User, {foreignKey: "user_id", as: "user"});

// User has many Comments through user_id
User.hasMany(Comment, {foreignKey: "user_id",});
Comment.belongsTo(User, {foreignKey: "user_id", as: 'user'});

// User has many Followers through user_id
User.hasMany(Follower, {foreignKey: "user_id"});
Follower.belongsTo(User, {foreignKey: "follower_id"});

// User has many Messages through user_id
User.hasMany(Message, {foreignKey: 'user_id'});
Message.belongsTo(User, {foreignKey: 'user_id'});

// User has many Channels through user_id
User.hasMany(Channel, {foreignKey: 'user_id'});
Channel.belongsTo(User, {foreignKey: 'user_id'});
//User.sync();
