import { inject, injectable } from "inversify";
import ICustomerNakamiService from "../Services/Interface/ICustomernakamiService";
import { Request, Response } from "express";
import { SaveCustomer_NakamiVM } from "../Database/Models/MCustomers_Nakami";
export interface ICustomerNakamiController {
    count(res: Response): any;
    getallbyCust(req: Request, res: Response): any;
    getcurrent(req:Request, res:Response): Promise<Response>
    getid(res: Response): any;
    getkota(res: Response): any;
    getbyagenid(req: Request, res: Response): any;
    gettop(res: Response): any;
    searchallCust(req:Request, res:Response): Promise<Response>;
    getbyid(req: Request, res: Response): any;
    create(req: Request, res: Response): any;
    update(req: Request, res: Response): any;
}


@injectable()
class CustomerNakamiController implements ICustomerNakamiController {
    private _customer: ICustomerNakamiService;
    constructor(@inject("ICustomerNakamiService") customer: ICustomerNakamiService) {
        this._customer = customer
    }

    async count(res: Response) {
        const list = await this._customer.getCountCustOrdCustomer();
        return res.status(200).json(list);
    }

    async getallbyCust(req: Request, res: Response) {
        const cust = req.params.Customer
        const list = await this._customer.getAllCustByCust(cust);
        return res.status(200).json(list);
    }

    async getcurrent(req: Request, res: Response): Promise<Response> {
        const list = await this._customer.getCurrentCustbyCust();
        return res.status(200).json(list)
    }

    async getid(res: Response) {
        const id = await this._customer.getIdCust();
        return res.status(200).json(id);
    }

    async getkota(res: Response) {
        const kota = await this._customer.getKotaCust();
        return res.status(200).json(kota);
    }

    async getbyagenid(req: Request, res: Response) {
        const agenid = parseInt(req.params.Id);
        try {
            const response = await this._customer.getByAgenId(agenid);
            if (!response) {
                return res.status(400).json(`${agenid} not found`);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    async gettop(res: Response) {
        const top = await this._customer.getTopCust();
        return res.status(200).json(top);
    }
    async searchallCust(req: Request, res: Response): Promise<Response> {
        const search = req.params.search;
        const list = await this._customer.searchAllCust(search);
        if(list){
            return res.status(201).json(list);
        }
        return res.status(401).json({message:`${search} not found`})
    }
    async getbyid(req: Request, res: Response) {
        const Id = parseInt(req.params.Id);
        try {
            const response = await this._customer.getIdCustById(Id);
            if (!response) {
                return res.status(400).json(`${Id} not found`);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    async create(req: Request, res: Response) {
        const {
            ID,
            Customer,
            Nama,
            Alamat,
            HP,
            Whatsapp,
            Email,
            AgenId,
            Status,
            SalesId,
            Kota,
            Keterangan,
            Jenis,
        } = req.body as SaveCustomer_NakamiVM
        const User_Input = req.app.locals.credential.Username
        try {
            const add = await this._customer.addCust({
                ID,
                Customer,
                Nama,
                Alamat,
                HP,
                Whatsapp,
                Email,
                AgenId,
                Status,
                SalesId,
                Kota,
                Keterangan,
                Jenis,
                User_Input: User_Input
            });
            if (!add) {
                return res.status(401).json({
                    message: `ada sebuah kesalahan atau mungkin belum memasukan data`
                });
            }
            return res.status(201).json({ message: `Data berhasil dibuat` });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: `${error}` });
        }
    }
    async update(req: Request, res: Response) {
        const parameterId = parseInt(req.params.Id);
        const {
            ID,
            Customer,
            Nama,
            Alamat,
            HP,
            Whatsapp,
            Email,
            AgenId,
            Status,
            SalesId,
            Kota,
            Keterangan,
            Jenis,
        } = req.body as SaveCustomer_NakamiVM
        const User_Input = req.app.locals.credential.Username
        try {
            const ubah = await this._customer.updateCust(parameterId, {
                ID,
                Customer,
                Nama,
                Alamat,
                HP,
                Whatsapp,
                Email,
                AgenId,
                Status,
                SalesId,
                Kota,
                Keterangan,
                Jenis,
                User_Input: User_Input
            });
            if (!ubah) {
                return res.status(401).json({ message: `Ada sebuah kesalahan data tidak dapat ter input` });
            }
            return res.status(201).json({ message: `${parameterId} berhasil di ubah` });
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    
}

export default CustomerNakamiController;