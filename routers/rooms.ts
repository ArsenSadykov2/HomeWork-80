    import express from 'express';
    import {DeleteId, Place, PlaceWithoutId} from "../types";
    import mysqlDb from "../mysqlDb";
    import {imagesUpload} from "../multer";
    import {ResultSetHeader, RowDataPacket} from "mysql2";

    const roomRouter = express.Router();

    roomRouter.get('/', async (req, res) => {
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT id, title FROM rooms');
        const products = result as Place[];
        res.send(products);
    });

    roomRouter.get('/:id', async (req, res) => {
        const id = req.params.id;
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT description FROM rooms WHERE id = ?', [id]);
        const products = result as Place[];
        res.send(products[0]);
    });

    roomRouter.post('/', imagesUpload.single('image'), async (req, res) => {
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
            'INSERT INTO rooms (title, description) VALUES (?, ?)',
            [newProduct.title, newProduct.description],
            );
        const resultHeader = result as ResultSetHeader;
        const id = resultHeader.insertId;

        const [oneProduct] = await connection.query('SELECT * FROM rooms WHERE id = ?', [id]);
        const products = oneProduct as Place[];
        res.send(products[0]);
    });

    roomRouter.delete('/:id', async (req, res) => {
        const id = req.params.id;
        const connection = await mysqlDb.getConnection();
        const [items] = await connection.query<RowDataPacket[]>('SELECT id FROM items WHERE category_id = ?',[id]);
        const results = items as DeleteId[];
        if(results.length > 0 ) {
            res.status(400).send({error: 'You cannot delete this item'});
        }

        const [result] = await connection.query<ResultSetHeader>('DELETE FROM rooms WHERE id = ?',[id]);

        res.json({message: `Category ${result} deleted successfully`});
    });

    export default roomRouter;