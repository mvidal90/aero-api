import * as express from "express";
import { getCategories } from "../controllers/categories";

const { Router } = require('express');

module.exports = (app: express.Application) => {
    const router = Router();
    
    router.get(
        '/',
        getCategories
    );

    app.use('/api/category_tree', router)
};