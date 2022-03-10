import axios from "axios";

const { response } = require('express');

interface Category {
    id: number, 
    name: string, 
    parent_id?: number,
    subcategories: Category[]
}

interface Data {
    categories: Category[]
}

interface Resp {
    data: Data
}

interface Request {
}

const URL_API = "https://challenge-api.aerolab.co/";

export const getCategories = async(req: Request, res = response) => {

    try {
        const resp: Resp = await axios.get(`${URL_API}categories`);
        
        const categoriesNewModel: Category[] = resp.data.categories.map( 
            cat => ({
                ...cat,
                subcategories: resp.data.categories.filter(
                    sc => sc.parent_id === cat.id
                ).map( 
                    sc => ({
                        ...sc,
                        subcategories: resp.data.categories.filter(
                            ssc => ssc.parent_id === sc.id
                        )
                    })
                )
            })
        )

        res.json({
            ok: true,
            categories: categoriesNewModel,
        });    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Algo fue mal, vuelve a intentarlo'
        });   
    }

};