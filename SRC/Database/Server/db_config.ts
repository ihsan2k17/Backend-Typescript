import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Memuat variabel lingkungan dari file .env
dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST1 as string;

const Sql = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mssql'
});

async function test() {
    try {
        await Sql.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test();

export default Sql;