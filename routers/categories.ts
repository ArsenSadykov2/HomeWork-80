import express from 'express';
import {Place, PlaceWithoutId} from "../types";
import mysqlDb from "../mysqlDb";
import {imagesUpload} from "../multer";
import {ResultSetHeader} from "mysql2";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT id, title FROM categories');
    const products = result as Place[];
    res.send(products);
});

categoriesRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT description FROM categories WHERE id = ?', [id]);
    const products = result as Place[];
    res.send(products[0]);
});

categoriesRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if(!req.body.title ) {
        res.status(400).send({error: 'Please send a title'});
        return;
    }

    const newProduct: PlaceWithoutId = {
        title: req.body.title,
        description: req.body.description,
    };

    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
        'INSERT INTO categories (title, description) VALUES (?, ?)',
        [newProduct.title, newProduct.description],
    );
    const resultHeader = result as ResultSetHeader;
    const id = resultHeader.insertId;

    const [oneProduct] = await connection.query('SELECT * FROM categories WHERE id = ?', [id]);
    const products = oneProduct as Place[];
    res.send(products[0]);
});

export default categoriesRouter;