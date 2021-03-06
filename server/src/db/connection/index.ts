import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const createConnection = () => {
    const conn = new Sequelize(
        process.env.DB_NAME!,
        process.env.DB_USERNAME!,
        process.env.DB_PASSWORD!,
        {
            host: "localhost",
            dialect: "postgres",
            port: parseInt(process.env.DB_PORT || "5432"),
            define: {
                timestamps: false
            }
        }
    );
    return conn;
};

export const sequelize = createConnection();
