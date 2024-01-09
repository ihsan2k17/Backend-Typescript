import { inject, injectable } from "inversify";
import IHadiahNakamiService from "../Interface/IHadiahNakamiService";
import { Hadiah_Nakami, Hadiah_NakamiVM, SaveHadiah_NakamiVM } from "../../Database/Models/MHadiah_Nakami";
import { IUnitOfWork } from "../../Repositories/Interface/iUnitOfWork";
import IHadiahNakamiRepository from "../../Repositories/Interface/IHadiahNakamiRepostiory";

@injectable()
class HadiahNakamiService implements IHadiahNakamiService {

    private _unitofwork: IUnitOfWork;
    private _hadiah: IHadiahNakamiRepository;

    constructor(
        @inject('IUnitOfWork') unitofwork: IUnitOfWork,
        @inject('IHadiahNakamiRepository') hadiah: IHadiahNakamiRepository
    ) {
        this._unitofwork = unitofwork;
        this._hadiah = hadiah;
    }

    async getallHadiah(): Promise<Hadiah_NakamiVM[]> {
        const getall = await this._hadiah.getallHadiah();
        const list = getall.map((hdh: Hadiah_Nakami) => {
            const vm = new Hadiah_NakamiVM(hdh);
            return vm;
        });
        return list;
    }
    async getBarangHadiahByPeriode(Periode: string): Promise<Hadiah_NakamiVM[]> {
        const getdata = await this._hadiah.getBarangHadiahbyPeriode(Periode);
        const list = getdata.map((hdh: Hadiah_Nakami) => {
            const vm = new Hadiah_NakamiVM(hdh);
            return vm;
        });
        return list;
    }
    async getPeriode(): Promise<Hadiah_NakamiVM[]> {
        const getper = await this._hadiah.getperiode();
        const list = getper.map((hdh:Hadiah_Nakami) => {
            const vm = new Hadiah_NakamiVM(hdh);
            return vm;
        });
        return list
    }
    async getPoinHadiah(): Promise<Hadiah_NakamiVM[]> {
        const getPoin  =await this._hadiah.getPoinHadiah();
        const list = getPoin.map((hdh: Hadiah_Nakami) => {
            const vm = new Hadiah_NakamiVM(hdh);
            return vm;
        });
        return list;
    }
    async getPoinByBarang(Barang: string): Promise<Hadiah_NakamiVM[]> {
        const getbarang = await this._hadiah.getHadiahFindbyBarang(Barang);
        const list = getbarang.map((hdh:Hadiah_Nakami) => {
            const vm = new Hadiah_NakamiVM(hdh);
            return vm;
        });
        return list;
    }
    async getHadiahfindbyPoin(Poin_Hadiah: number): Promise<Hadiah_NakamiVM[]> {
        if (!Poin_Hadiah) {
            throw new Error("Poin "+ Poin_Hadiah +" Tidak Tersedia");
        };
        const findpoin = await this._hadiah.getHadiahFindbyPoin(Poin_Hadiah);
        const response = findpoin.map((hdh: Hadiah_Nakami) => {
            const vm = new Hadiah_NakamiVM(hdh);
            return vm;
        });
        return response;
    }
    async addHadiah(entity: SaveHadiah_NakamiVM): Promise<boolean | null> {
        try {
            if(!entity) {
                throw new Error(`Ada Data Yang belum diisi`)
            };
            const newHadiah : Hadiah_Nakami = Object.assign(new Hadiah_Nakami(), {
                Poin_Hadiah : entity.Poin_Hadiah,
                Barang : entity.Barang,
                Periode: entity.Periode,
                Jenis:entity.Jenis
            });
            const add = await this._hadiah.addHadiah(newHadiah);
            const save: SaveHadiah_NakamiVM =  new SaveHadiah_NakamiVM(add);
            return !!save
        } catch (error) {
            throw new Error(`Add Hadiah Failes, Please Check Your Networkng or calling IT Division, ${error}`)
        }
    }
    async deleteHadiah(Barang: string): Promise<boolean> {
        const cekbrang = await this._hadiah.getHadiahFindbyBarang(Barang);
        if(!cekbrang) {
            throw new Error(`${Barang} Not Found`)
        }
        try {
            await this._unitofwork.beginTransaction();
            const oldbarang : Hadiah_Nakami = Object.assign(new Hadiah_Nakami(), {
                Barang : Barang,
            });
            await this._hadiah.deleteHadiah(oldbarang);
            await this._unitofwork.Save();
            const simpandata: SaveHadiah_NakamiVM = new SaveHadiah_NakamiVM(oldbarang);
            if (simpandata) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }
    async updateHadiah(barang: string, entity: SaveHadiah_NakamiVM): Promise<boolean> {
        const cekbarang = await this._hadiah.getHadiahFindbyBarang(barang);
        if(!cekbarang) {
            throw new Error(`${barang} Not Found`);
        }
        try {
            await this._unitofwork.beginTransaction();
            const data: Hadiah_Nakami = Object.assign(new Hadiah_Nakami(), {
                Poin_Hadiah: entity.Poin_Hadiah,
                Barang: entity.Barang,
                Periode: entity.Periode,
                Jenis: entity.Jenis,
                BarangOld: barang
            })
            await this._hadiah.updateHadiah(data);
            await this._unitofwork.Save();
            const simpan: SaveHadiah_NakamiVM = new SaveHadiah_NakamiVM(data);
            if (simpan) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }  
    }

}

export default HadiahNakamiService;