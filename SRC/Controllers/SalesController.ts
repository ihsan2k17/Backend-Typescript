import { Request, Response } from "express";
import 'reflect-metadata';
import { inject } from "inversify";
import { injectable } from "inversify";
import InterfaceSalesService from "../Services/Interface/InSalesService";
import { SaveSalesVM } from "../Database/Models/MSalesPerson";

export interface ISalesController {
    search(req: Request, res: Response): any
    getsales(res: Response): any
    getname(res: Response): any
    create(req: Request, res: Response): any
    Update(req: Request, res: Response): any
    delete(req:Request, res:Response):any
}

@injectable()
class SalesController implements ISalesController {
    private _SSales: InterfaceSalesService;

    constructor(@inject('InterfaceSalesService') SSales: InterfaceSalesService) {
        this._SSales = SSales;
    }
    
    async search(req: Request, res: Response) {
        const paramater = req.params.key;
        const result = await this._SSales.searchSales(paramater);
        if (!result) {
            return res.status(400).json({ message: `${paramater}` });
        }
        return res.status(200).json(result)
    }


    async getname(res: Response) {
        const getid = await this._SSales.getNamaSales();
        return res.status(200).json(getid);
    }

    async getsales(res: Response) {
        const list = await this._SSales.getAllSales();
        return res.status(200).json(list);
    }

    async create(req: Request, res: Response) {
        const entity = req.body as SaveSalesVM;
        try {
            const add = await this._SSales.addSales(entity);
            if (!add) {
                return res.status(401).json({
                    message: `ada sebuah kesalahan atau mungkin belum memasukan data`
                });
            }
            return res.status(201).json({ message: `data success` });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: `${error}` });
        };
    }

    async Update(req: Request, res: Response) {
        const parameter = req.params.namasales;
        const entity = req.body as SaveSalesVM;
        const result = await this._SSales.updateSales(parameter, entity);
        if (result) {
            return res.status(201).json({ message: `${entity.Sales_Name} success di udpate` });
        } else {
            return res.status(400).json({ message: "error" });
        }
    }
    async delete(req: Request, res: Response) {
        const parameter = req.params.id;
        const result = await this._SSales.delete(parameter);
        if (result) {
            return res.status(202).json({ message: `id sales ${parameter} success di hapus` });
        } else {
            return res.status(400).json({ message: `erorr` });
        }
    }
}

export default SalesController;
