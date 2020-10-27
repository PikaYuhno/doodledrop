import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection";

export default class Comment extends Model {
    public id!: number;
    public doodle_id!: number;
    public user_id!: number;
    public content!: string;
    public created_at!: Date;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        doodle_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "comments",
    }
);

Comment.sync();
