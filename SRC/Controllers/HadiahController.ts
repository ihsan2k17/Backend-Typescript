import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import IHadiahService from "../Services/Interface/IHadiahService";
import { SaveHadiahVM } from "../Database/Models/MHadiah";
import { ParamsDictionary } from "express-serve-static-core";

export interface IHadiahController {
    getall(res: Response): any;
    getbarangByPeriode(req:Request,res: Response): Promise<Response>;
    getPoinByBarang(req:Request,res: Response): Promise<Response>;
    getPeriode(res:Response):Promise<Response>;
    getPoin(res: Response): Promise<Response>;
    findPoin(req: Request, res: Response): any;
    add(req: Request, res :Response): Promise<Response>;
    delete(req:Request, res:Response):Promise<Response>;
    update(req:Request, res:Response): Promise<Response>;
};

@injectable()
class HadiahController implements IHadiahController{
    private _hadiah: IHadiahService;
    constructor(
        @inject('IHadiahService') shadiah:IHadiahService
    ) {
        this._hadiah = shadiah;
    }
    
    async add(req: Request, res: Response): Promise<Response> {
        const entity = req.body as SaveHadiahVM;
        try {
            const add = await this._hadiah.addHadiah(entity);
            if (!add) {
                return res.status(401).json({
                    message: `ada sebuah kesalahan atau mungkin belum memasukan data`
                });
            }
            return res.status(201).json({ message: `Hadiah ${entity.Periode} success terinput` });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: `${error}` });
        }
    }

    async getall(res: Response) {
        const list = await this._hadiah.getallHadiah();
        return res.status(200).json(list);
    }
    async getbarangByPeriode(req:Request,res: Response) {
        const periode = req.params.Periode
        const list = await this._hadiah.getBarangHadiahByPeriode(periode);
        if(list){
            return res.status(200).json(list);
        }
        return res.status(400).json({message:`not found`})
    }
    async getPeriode(res: Response) {
        const list = await this._hadiah.getPeriode();
        return res.status(200).json(list);
    }
    async getPoinByBarang(req:Request,res: Response): Promise<Response> {
        const barang = req.params.Barang;
        try {
            const resp = await this._hadiah.getPoinByBarang(barang);
            if(resp) {
                return res.status(200).json(resp);
            }
            return res.status(400).json(`${barang} tidak ditemukan`)
        } catch (error) {
            return res.status(500).json({message: `${error}`})
        }
    }
    async getPoin(res: Response<any, Record<string, any>>): Promise<Response> {
        const list = await this._hadiah.getPoinHadiah();
        return res.status(200).json(list);
    }
    async findPoin(req: Request, res: Response) {
        const poin = Number(req.params.Poin_Hadiah);
        try {
            const response = await this._hadiah.getHadiahfindbyPoin(poin);
            if (!response) {
                return res.status(400).json(`${poin} not found`)
            }
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }
    async delete(req: Request, res: Response): Promise<Response> {
        const barang = req.params.Barang;
        try {
            const del = await this._hadiah.deleteHadiah(barang);
            if (!del) {
                return res.status(402).json({ message: `Ada Kesalahan Data tidak dapat Terhapus` });
            }
            return res.status(202).json({ message: `${barang} berhasil terhapus` });
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    async update(req: Request, res: Response): Promise<Response> {
        const barang = req.params.Barang;
        const bodyupdate = req.body as SaveHadiahVM;
        try {
            const ubah = await this._hadiah.updateHadiah(barang, bodyupdate);
            if (!ubah) {
                return res.status(401).json({ message: `Ada sebuah kesalahan data tidak dapat ter input` });
            }
            return res.status(201).json({ message: `${bodyupdate.Barang} berhasil di ubah` });
        } catch (error) {
            return res.status(500).json({message: `${error}`})
        }
    }
};

export default HadiahController;