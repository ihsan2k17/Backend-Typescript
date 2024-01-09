import { inject, injectable } from "inversify";
import IPeriodeService from "../Interface/IPeriodeService";
import { Periode, PeriodeVM } from "../../Database/Models/MPeriode";
import { IUnitOfWork } from "../../Repositories/Interface/iUnitOfWork";
import IPeriodeRepository from "../../Repositories/Interface/IPeriodeRepository";

@injectable()
class PeriodeService implements IPeriodeService {

    private _unitofwork: IUnitOfWork;
    private _periode: IPeriodeRepository;

    constructor(
        @inject('IUnitOfWork') unitofwork: IUnitOfWork,
        @inject('IPeriodeRepository') periode: IPeriodeRepository
    ) {
        this._unitofwork = unitofwork;
        this._periode = periode;
    }

    async selectPeriode(): Promise<PeriodeVM[]> {
        const getall = await this._periode.selectPeriode();
        const list = getall.map((hdh: Periode) => {
            const vm = new PeriodeVM(hdh);
            return vm;
        });
        return list;
    }

}

export default PeriodeService;