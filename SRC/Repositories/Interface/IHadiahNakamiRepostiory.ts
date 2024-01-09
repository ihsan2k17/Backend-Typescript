import { Hadiah_Nakami } from "../../Database/Models/MHadiah_Nakami";

interface IHadiahNakamiRepository {
    getallHadiah(): Promise<Hadiah_Nakami[]>;
    getHadiahFindbyPoin(Poin_Hadiah: number): Promise<Hadiah_Nakami[]>;
    getHadiahFindbyBarang(Barang: string): Promise<Hadiah_Nakami[]>;
    getBarangHadiahbyPeriode(Periode:string): Promise<Hadiah_Nakami[]>;
    getperiode():Promise<Hadiah_Nakami[]>
    getPoinHadiah(): Promise<Hadiah_Nakami[]>;
    addHadiah(entity: Hadiah_Nakami): Promise<Hadiah_Nakami>;
    updateHadiah(entity: Hadiah_Nakami): Promise<void>;
    deleteHadiah(entity: Hadiah_Nakami):Promise<void>;
}

export default IHadiahNakamiRepository