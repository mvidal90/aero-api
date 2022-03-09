

import express from "express";
import { getProducts } from "../controllers/products";

const { Router } = require('express');

module.exports = (app: express.Application) => {
    const router = Router();
    
    router.get(
        '/:page',
        getProducts
    );

    app.use('/api/products', router)
} ;