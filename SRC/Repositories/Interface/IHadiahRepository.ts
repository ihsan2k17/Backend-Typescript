import { Hadiah } from "../../Database/Models/MHadiah";

interface IHadiahRepository {
    getallHadiah(): Promise<Hadiah[]>;
    getHadiahFindbyPoin(Poin_Hadiah: number): Promise<Hadiah[]>;
    getHadiahFindbyBarang(Barang: string): Promise<Hadiah[]>;
    getBarangHadiahbyPeriode(Periode:string): Promise<Hadiah[]>;
    getperiode():Promise<Hadiah[]>
    getPoinHadiah(): Promise<Hadiah[]>;
    addHadiah(entity: Hadiah): Promise<Hadiah>;
    updateHadiah(entity: Hadiah): Promise<void>;
    deleteHadiah(entity: Hadiah):Promise<void>;
}

export default IHadiahRepository;