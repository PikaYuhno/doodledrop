import {Model, DataTypes} from "sequelize";
import {sequelize} from "../connection";
import Comment from "./Comment";


export default class Doodle extends Model {
    public id!: number;
    public user_id!: number;
    public title!: string;
    public image_path!: string;
    public likes!: number[];
    public dislikes!: number[];
    public created_at!: Date;
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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        likes: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: [],
        },
        dislikes: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: [],
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        }
    },
    {
        sequelize: sequelize,
        tableName: "doodles",
    }
);

Doodle.hasMany(Comment, {foreignKey: "doodle_id", as: 'comments'});
Comment.belongsTo(Doodle, {foreignKey: "doodle_id", as: 'comments'});

//Doodle.sync();

