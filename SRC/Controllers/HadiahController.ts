import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import IHadiahService from "../Services/Interface/IHadiahService";

export interface IHadiahController {
    getall(res: Response): any;
    getbarangByPeriode(req:Request,res: Response): Promise<Response>;
    getPeriode(res:Response):Promise<Response>
    getPoin(res: Response): Promise<Response>
    findPoin(req: Request, res: Response): any;
};

@injectable()
class HadiahController implements IHadiahController{
    private _hadiah: IHadiahService;
    constructor(
        @inject('IHadiahService') shadiah:IHadiahService
    ) {
        this._hadiah = shadiah;
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
    
};

export default HadiahController;