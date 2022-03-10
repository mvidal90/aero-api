import axios from "axios";
import moment from "moment";
import { imgConvert } from "../helpers/imgConvert";

const { response } = require('express');

interface Products {
    id: string,
    name: string,
    price: number,
    presentation: string,
    brand: string,
    photo: any,
    originalPrice: number,
    updatedAt: Date,
    priceUSD: number
}

interface Data {
    products: Products[],
    page: number,
    per_page: number,
    page_count: number
}

interface RespAPI {
    data: Data
}

interface DollarData {
    rate: number,
    currency: string,
    updatedAt: Date,
}

interface Dollar {
    data: DollarData
}

interface Params {
    page: string
}

interface Request {
    params: Params
}

const URL_API = "https://challenge-api.aerolab.co/";

export const getProducts = async (req: Request, res = response) => {

    const pageReq: number = parseInt(req.params.page, 10);
    
    try {
        const products: Products[] = [];
        let page: number = 1;
        let totalPages: number;
        const dollar: Dollar = await axios.get(`${URL_API}dollar`);
        
        do {
            const resp: RespAPI = await axios.get(`${URL_API}products?page=${page}`);
            products.push(...resp.data.products);
            totalPages = resp.data.page_count;
            page++;
        } while (page <= totalPages);

        const newProductList: Products[] = products.filter(
            item => new Date(moment(item.updatedAt).format("MM/DD/YYYY")) > new Date(moment().subtract(1, "month").format("MM/DD/YYYY"))
        );

        const page_count: number = Math.ceil(newProductList.length / 20);

        if (pageReq > page_count) {
            return res.status(401).json({
                ok: false,
                msg: "La página solicitada no existe."
            })
        }
        
        const productNewModel: Products[] = await Promise.all(
            newProductList
                .slice((pageReq - 1) * 20, pageReq * 20)
                .map(async (prod) => ({
                    ...prod,
                    priceUSD: parseFloat((prod.price / dollar.data.rate).toFixed(2)),
                    photo: await imgConvert(prod.photo)
                }))
        );

        res.json({
            ok: true,
            products: productNewModel,
            page: pageReq,
            page_count,
            per_page: productNewModel.length,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo fue mal, vuelve a intentarlo'
        });
    }

};