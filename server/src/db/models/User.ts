import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection";

export default class User extends Model {
    public id!: number;
    public name!: string;
}

User.init(
    {
        id: {
            DataType: DataTypes.INTEGER,
        },
    },
    {
        tableName: "users",
        sequelize: sequelize,
    }
);
