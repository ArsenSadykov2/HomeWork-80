import myslq, {Connection} from "mysql2/promise";

let connection: Connection;

const mysqlDb = {
    async init() {
        connection = await myslq.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'HomeWork80-api'
        });
    },
    async getConnection() {
        return connection;
    }
}
export default mysqlDb;
