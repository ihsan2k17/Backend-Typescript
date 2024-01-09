import { HadiahVM, SaveHadiahVM } from "../../Database/Models/MHadiah";

interface IHadiahService {
    getallHadiah(): Promise<HadiahVM[]>;
    getBarangHadiahByPeriode(Periode:string): Promise<HadiahVM[]>;
    getPeriode():Promise<HadiahVM[]>;
    getPoinHadiah(): Promise<HadiahVM[]>;
    getHadiahfindbyPoin(Poin_Hadiah:number): Promise<HadiahVM[]>;
    getPoinByBarang(Barang:string):Promise<HadiahVM[]>;
    addHadiah(entity:SaveHadiahVM):Promise<boolean|null>;
    deleteHadiah(Barang: string): Promise<boolean>;
    updateHadiah(barang: string, entity:SaveHadiahVM): Promise<boolean>;
};
export default IHadiahService;