import { inject, injectable } from "inversify";
import IAgenService from "../Services/Interface/IAgenService";
import { Request, Response } from "express";
import 'reflect-metadata';
import { SaveAgenVM } from "../Database/Models/MAgen";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface IAgenController{
    searchName(req: Request, res: Response): any
    search(req:Request, res:Response): Promise<Response>
    getAll(res: Response): any
    getallnama(req:Request, res:Response):any
    getname(res: Response): any
    getkota(res:Response): Promise<Response>
    findname(req: Request, res:Response):any
    create(req: Request, res: Response): any
    Update(req: Request, res: Response): any
    delete(req: Request, res: Response): any
};

@injectable()
class AgenController implements IAgenController{
    
    private _sagen: IAgenService;
    constructor(@inject("IAgenService") sagen: IAgenService) {
        this._sagen = sagen;
    }

    async searchName(req: Request, res: Response) {
        const nama = req.params.Agen_Name;
        try {
            const response = await this._sagen.searchAgenName(nama);
            if(!response) {
                return res.status(400).json(`${nama} not found`)
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({message: `${error}`})
        }
    }
    async search(req: Request, res: Response): Promise<Response> {
        const querynama = req.params.query;
        try {
            const response = await this._sagen.search(querynama);
            if(!response) {
                return res.status(400).json(`${querynama} not found`)
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({message: `${error}`})
        }      
    }
    async getAll(res: Response) {
        const list = await this._sagen.getAllAgen();
        return res.status(200).json(list);
    }

    async getallnama(req: Request, res: Response) {
        const nama = req.params.Agen_Name;
        try {
            const response = await this._sagen.getAllfindNama(nama);
            if (!response) {
                return res.status(400).json(`${nama} Not Found`)
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({message:`${error}`})
        }
    }
    async getname(res: Response) {
        const listnama = await this._sagen.getAgenName();
        return res.status(200).json(listnama);
    }
    async getkota(res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const listkota = await this._sagen.getKotaAgen();
        return res.status(200).json(listkota);    
    }
    async findname(req: Request, res: Response) {
        const findnama = req.params.Agen_Name;
        try {
            const response = await this._sagen.getAgenFindbyNama(findnama);
            if (!response) {
                return res.status(400).json(`${findnama} Not Found`);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    async create(req: Request, res: Response) {
        const entity = req.body as SaveAgenVM;
        try {
            const add = await this._sagen.addAgen(entity);
            if (!add) {
                return res.status(401).json({
                    message: `ada sebuah kesalahan atau mungkin belum memasukan data`
                });
            }
            return res.status(201).json({ message: `data success` });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: `${error}` });
        }
    };
    
    async Update(req: Request, res: Response) {
        const id = req.params.AgenID;
        const nama = req.params.Agen_Name;
        const body = req.body as SaveAgenVM;
        try {
            const ubah = await this._sagen.updateAgen(id, nama, body);
            if (!ubah) {
                return res.status(401).json({ message: `Ada sebuah kesalahan data tidak dapat ter input` });
            }
            return res.status(201).json({ message: `${nama} berhasil di ubah` });
        } catch (error) {
            return res.status(500).json({message: `${error}`})
        }
    };

     async delete(req: Request, res: Response) {
         const id = req.params.AgenID;
         const nama = req.params.Agen_Name;
         const kota = req.params.Kota;
         const sls = req.params.SalesID;
         try {
             const hapus = await this._sagen.deleteAgen(id, nama, kota, sls);
             if (!hapus) {
                 return res.status(402).json({ message: `Ada Kesalahan Data tidak dapat Terhapus` });
             }
             return res.status(202).json({ message: `${hapus} berhasil terhapus` });
         } catch (error) {
             return res.status(500).json({ message: `${error}` });
         }
    }

};
export default AgenController;
