import { inject, injectable } from "inversify";
import IHadiahService from "../Interface/IHadiahService";
import { Hadiah, HadiahVM } from "../../Database/Models/MHadiah";
import { IUnitOfWork } from "../../Repositories/Interface/iUnitOfWork";
import IHadiahRepository from "../../Repositories/Interface/IHadiahRepository";

@injectable()
class HadiahService implements IHadiahService{
    private _unitofwork: IUnitOfWork;
    private _hadiah: IHadiahRepository;

    constructor(
        @inject('IUnitOfWork') unitofwork: IUnitOfWork,
        @inject('IHadiahRepository') hadiah: IHadiahRepository
    ) {
        this._unitofwork = unitofwork;
        this._hadiah = hadiah;
    }

    async getallHadiah(): Promise<HadiahVM[]> {
        const getall = await this._hadiah.getallHadiah();
        const list = getall.map((hdh: Hadiah) => {
            const vm = new HadiahVM(hdh);
            return vm;
        });
        return list;
    }
    async getBarangHadiahByPeriode(Periode:string): Promise<HadiahVM[]> {
        const getdata = await this._hadiah.getBarangHadiahbyPeriode(Periode);
        const list = getdata.map((hdh: Hadiah) => {
            const vm = new HadiahVM(hdh);
            return vm;
        });
        return list;
    }

    async getPeriode(): Promise<HadiahVM[]> {
        const getper = await this._hadiah.getperiode();
        const list = getper.map((hdh:Hadiah) => {
            const vm = new HadiahVM(hdh);
            return vm;
        });
        return list
    }

    async getPoinHadiah(): Promise<HadiahVM[]> {
        const getPoin  =await this._hadiah.getPoinHadiah();
        const list = getPoin.map((hdh: Hadiah) => {
            const vm = new HadiahVM(hdh);
            return vm;
        });
        return list;
    }
    async getHadiahfindbyPoin(Poin_Hadiah: number): Promise<HadiahVM[]> {
        if (!Poin_Hadiah) {
            throw new Error("Poin "+ Poin_Hadiah +" Tidak Tersedia");
        };
        const findpoin = await this._hadiah.getHadiahFindbyPoin(Poin_Hadiah);
        const response = findpoin.map((hdh: Hadiah) => {
            const vm = new HadiahVM(hdh);
            return vm;
        });
        return response;
    }
}

export default HadiahService;