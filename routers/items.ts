import express from 'express';
import {Place, Product, ProductWithoutId} from "../types";
import {imagesUpload} from "../multer";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader} from "mysql2";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM items');
    const products = result as Product[];
    res.send(products);
});

itemsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
    const product = result as Product[];
    res.send(product[0]);
});

itemsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if(!req.body.title || !req.body.category_id || !req.body.rooms_id) {
        res.status(400).send({error: 'Please send a title, category_id, place_id'});
        return;
    }

    const newProduct: ProductWithoutId = {
        category_id: req.body.category_id,
        rooms_id: req.body.rooms_id,
        title: req.body.title,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : null,
    };

    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
        'INSERT INTO items (category_id, rooms_id, title, description, image) VALUES (?, ?, ?, ?, ?)',
        [newProduct.category_id, newProduct.rooms_id, newProduct.title, newProduct.description, newProduct.image],
    );

    const resultHeader = result as ResultSetHeader;
    const id = resultHeader.insertId;

    const [oneProduct] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
    const products = oneProduct as Place[];
    res.send(products[0]);
});

export default itemsRouter;