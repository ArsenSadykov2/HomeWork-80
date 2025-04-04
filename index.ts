import express from "express";
import cors from 'cors';
import mysqlDb from "./mysqlDb";
const app = express();
const port = 8000;


app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const run = async () => {
    await mysqlDb.init();

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(console.error);

