import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection";
import Comment from "./Comment";

export default class Doodle extends Model {
    public id!: number;
    public user_id!: number;
    public image_path!: string;
    public likes!: number;
    public dislikes!: number;
}

Doodle.init(
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
        image_path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        dislikes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize: sequelize,
        tableName: "doodles",
    }
);

Doodle.hasMany(Comment, { foreignKey: "doodle_id" });
Comment.belongsTo(Doodle, { foreignKey: "doodle_id" });
Doodle.sync();
