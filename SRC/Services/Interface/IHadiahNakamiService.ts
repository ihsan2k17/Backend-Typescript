import { Hadiah_NakamiVM, SaveHadiah_NakamiVM } from "../../Database/Models/MHadiah_Nakami";

interface IHadiahNakamiService {
    getallHadiah(): Promise<Hadiah_NakamiVM[]>;
    getBarangHadiahByPeriode(Periode:string): Promise<Hadiah_NakamiVM[]>;
    getPeriode():Promise<Hadiah_NakamiVM[]>;
    getPoinHadiah(): Promise<Hadiah_NakamiVM[]>;
    getPoinByBarang(Barang:string):Promise<Hadiah_NakamiVM[]>;
    getHadiahfindbyPoin(Poin_Hadiah:number): Promise<Hadiah_NakamiVM[]>;
    addHadiah(entity:SaveHadiah_NakamiVM):Promise<boolean|null>;
    deleteHadiah(Barang: string): Promise<boolean>;
    updateHadiah(barang: string, entity:SaveHadiah_NakamiVM): Promise<boolean>;
}

export default IHadiahNakamiService