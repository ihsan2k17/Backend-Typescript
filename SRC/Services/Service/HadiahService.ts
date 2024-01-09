import { inject, injectable } from "inversify";
import IHadiahService from "../Interface/IHadiahService";
import { Hadiah, HadiahVM, SaveHadiahVM } from "../../Database/Models/MHadiah";
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

    async getPoinByBarang(Barang: string): Promise<HadiahVM[]> {
        const getbarang = await this._hadiah.getHadiahFindbyBarang(Barang);
        const list = getbarang.map((hdh:Hadiah) => {
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
    async addHadiah(entity: SaveHadiahVM): Promise<boolean | null> {
        try {
            if(!entity) {
                throw new Error(`Ada Data Yang belum diisi`)
            };
            const newHadiah : Hadiah = Object.assign(new Hadiah(), {
                Poin_Hadiah : entity.Poin_Hadiah,
                Barang : entity.Barang,
                Periode: entity.Periode,
                Jenis:entity.Jenis
            });
            const add = await this._hadiah.addHadiah(newHadiah);
            const save: SaveHadiahVM =  new SaveHadiahVM(add);
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
            const oldbarang : Hadiah = Object.assign(new Hadiah(), {
                Barang : Barang,
            });
            await this._hadiah.deleteHadiah(oldbarang);
            await this._unitofwork.Save();
            const simpandata: SaveHadiahVM = new SaveHadiahVM(oldbarang);
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
    async updateHadiah(barang: string, entity: SaveHadiahVM): Promise<boolean> {
        const cekbarang = await this._hadiah.getHadiahFindbyBarang(barang);
        if(!cekbarang) {
            throw new Error(`${barang} Not Found`);
        }
        try {
            await this._unitofwork.beginTransaction();
            const data: Hadiah = Object.assign(new Hadiah(), {
                Poin_Hadiah: entity.Poin_Hadiah,
                Barang: entity.Barang,
                Periode: entity.Periode,
                Jenis: entity.Jenis,
                BarangOld: barang
            })
            await this._hadiah.updateHadiah(data);
            await this._unitofwork.Save();
            const simpan: SaveHadiahVM = new SaveHadiahVM(data);
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

export default HadiahService;