import express from "express";
import cors from 'cors';
import mysqlDb from "./mysqlDb";
import roomRouter from "./routers/rooms";
import categoriesRouter from "./routers/categories";
import itemsRouter from "./routers/items";
const app = express();
const port = 8000;


app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/rooms', roomRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

const run = async () => {
    await mysqlDb.init();

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(console.error);

