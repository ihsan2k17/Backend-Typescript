import { inject, injectable } from "inversify";
import IAgenService from "../Interface/IAgenService";
import { Agen, AgenVM, Agen_NameVM, SaveAgenVM } from "../../Database/Models/MAgen";
import { IUnitOfWork } from "../../Repositories/Interface/iUnitOfWork";
import IAgenRepository from "../../Repositories/Interface/IAgenNewRepository";

@injectable()
class AgenService implements IAgenService{
    private _unitofwork: IUnitOfWork;
    private _agen: IAgenRepository;

    constructor(@inject("IUnitOfWork") unitofwork: IUnitOfWork,
        @inject("IAgenRepository") agenrepos: IAgenRepository)
     {
        this._unitofwork = unitofwork;
        this._agen = agenrepos;
    }
    async searchAgenName(Agen_Name: string): Promise<AgenVM[]> {
        const getnama = await this._agen.searchNama(Agen_Name);
        const res = getnama.map((agen: Agen) => {
            const vm = new AgenVM(agen);
            return vm
        });
        return res;
    }
    async search(query: string): Promise<AgenVM[]> {
        const getnama = await this._agen.search(query);
        const res = getnama.map((agen: Agen) => {
            const vm = new AgenVM(agen);
            return vm
        });
        return res;
    }
    async getAllAgen():Promise<AgenVM[]> {
        const getall = await this._agen.getAllAgen();
        const list = getall.map((agen: Agen) => {
            const vm = new AgenVM(agen);
            return vm;
        });
        return list;
    };

    async getAllfindNama(Agen_Name: string): Promise<string | AgenVM[]> {
        if (!Agen_Name) {
            return []
        };
        const getnama = await this._agen.getAllFindNama(Agen_Name);
        const response = getnama.map((agen: Agen) => {
            const vm = new AgenVM(agen);
            return vm;
        });
        return response;
    };

    async getAgenName(): Promise<AgenVM[]> {

        const getdata = await this._agen.getnamaAgen();
        const list = getdata.map((agen: Agen) => {
            const vm = new AgenVM(agen);
            return vm;
        });
        return list;
    };

    async getKotaAgen(): Promise<AgenVM[]> {
        const getdata = await this._agen.getKotaAgen();
        const list = getdata.map((agen:Agen) => {
            const vm = new AgenVM(agen);
            return vm;
        });
        return list;
    }
    async getAgenFindbyNama(Agen_Name: string): Promise<string | AgenVM[]>{
        if (!Agen_Name) {
            throw new Error(""+ Agen_Name +" Tidak ada");
        }
        const findnama = await this._agen.getAgenFindbynama(Agen_Name);
        const response = findnama.map((agen: Agen) => {
            const vm = new AgenVM(agen);
            return vm;
        });
        return response;
        
    };

    async addAgen(entity: SaveAgenVM): Promise<boolean|null> {
        try {
            if (!entity) {
                throw new Error("Data Tidak ada");
            }
            const newagen: Agen = Object.assign(new Agen(), {
                AgenID: entity.AgenID,
                Agen_Name: entity.Agen_Name,
                Kota: entity.Kota,
                SalesID: entity.SalesID,
            });
            const add = await this._agen.addAgen(newagen);
            const save: SaveAgenVM = new SaveAgenVM(add);
            return !!save;
        } catch (error) {
            throw error;
        }
    };

    async updateAgen(AgenID: string, Agen_Name: string,  entity: SaveAgenVM): Promise<boolean> {
        const getid = await this._agen.getAllFindId(AgenID)
        if (!getid) {
            throw new Error(""+ AgenID +" Tidak tersedia ");
        }
        const getnama = await this._agen.getAllFindNama(Agen_Name)
        if (!getnama) {
            throw new Error(""+ Agen_Name +" Tidak Tersedia ");
        }
        try {
            await this._unitofwork.beginTransaction();
            const data: Agen = Object.assign(new Agen(), {
                Kota: entity.Kota,
                SalesID: entity.SalesID,
                AgenID: AgenID,
                Agen_Name: Agen_Name
            });
            await this._agen.updateAgen(data);
            await this._unitofwork.Save();
            const simpan: SaveAgenVM = new SaveAgenVM(data);
            if (simpan) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        } 
    };

    async deleteAgen(AgenID: string, Agen_Name: string, Kota: string, SalesID: string): Promise<Boolean> {
        const cekid = await this._agen.getAllFindId(AgenID);
        if (cekid.length === 0) {
            throw new Error(""+ AgenID +" tidak ditemukan ");
        };
        const ceknama = await this._agen.getAllFindNama(Agen_Name);
        if (!ceknama) {
            throw new Error(""+ Agen_Name +" tidak ditemukan ");
        };
        const cekkota = await this._agen.getAllFindKota(Kota);
        if (!cekkota) {
            throw new Error(""+ Kota +" tidak ditemukan ");
        };
        const ceksls = await this._agen.getAllFindSales(SalesID);
        if (!ceksls) {
            throw new Error(""+ SalesID +" tidak ditemukan ");
        };
        try {
            await this._unitofwork.beginTransaction();
            const isUsed = await this._agen.cekketergantunganData(AgenID);
            if (isUsed) {
                throw new Error("Agen Memiliki Hubungan di Customer, Silahkan anda Hapus Customer dahulu");
            }
            const hapus: Agen = Object.assign(new Agen(), {
                AgenID: AgenID,
                Agen_Name: Agen_Name,
                Kota: Kota,
                SalesID: SalesID
            });
            await this._agen.deleteAgen(hapus);
            await this._unitofwork.Save();
            const simpandata: SaveAgenVM = new SaveAgenVM(hapus);
            if (simpandata) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose()
            throw error
        }
    };

};

export default AgenService;