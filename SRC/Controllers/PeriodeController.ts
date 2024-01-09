import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import IPeriodeService from "../Services/Interface/IPeriodeService";

export interface IperiodeController {
    selectPeriode(res:Response):Promise<Response>
}

@injectable()
class PeriodeController implements IperiodeController {

    private _periode: IPeriodeService;
    constructor(
        @inject('IPeriodeService') speriode:IPeriodeService
    ) {
        this._periode = speriode;
    }

    async selectPeriode(res: Response): Promise<Response>{
        const list = await this._periode.selectPeriode();
        return res.status(200).json(list);
    }

}

export default PeriodeController;