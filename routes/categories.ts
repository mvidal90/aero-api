const { getCategories } = require ("../controllers/categories");

const getCategoryiesRoute = () => {
    const  { Router } = require('express');
    const router = Router();
    router.get('/', getCategories);
    return router
}
    
module.exports = getCategoryiesRoute();