import { Sequelize } from "sequelize";

export const createConnection = () => {
    const conn = new Sequelize("postgres", "postgre", "postgres", {
        host: "localhost",
        dialect: "postgres",
    });
    return conn;
};

export const sequelize = createConnection();
