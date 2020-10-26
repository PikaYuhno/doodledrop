import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection";

export default class User extends Model {
    public id!: number;
    public username!: string;
    public first_name!: string;
    public last_name!: string;
    public password!: string;
    public email!: string;
    public created_doodles!: number;
    public pfp_pic_path!: string;
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
        pfp_pic_path: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "path/to/default/pfp",
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

User.sync({ force: true });
