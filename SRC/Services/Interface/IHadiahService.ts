import { HadiahVM } from "../../Database/Models/MHadiah";

interface IHadiahService {
    getallHadiah(): Promise<HadiahVM[]>;
    getBarangHadiahByPeriode(Periode:string): Promise<HadiahVM[]>;
    getPeriode():Promise<HadiahVM[]>;
    getPoinHadiah(): Promise<HadiahVM[]>;
    getHadiahfindbyPoin(Poin_Hadiah:number): Promise<HadiahVM[]>;
};
export default IHadiahService;