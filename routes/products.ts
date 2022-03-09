const { getProducts } = require("../controllers/products");

const getProductsRoute = () => {
    const { Router } = require('express');
    const router = Router();
    router.get('/:page', getProducts);
    return router
}

module.exports = getProductsRoute;