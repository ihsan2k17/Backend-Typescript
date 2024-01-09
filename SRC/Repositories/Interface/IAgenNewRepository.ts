import { Agen } from "../../Database/Models/MAgen"

interface IAgenRepository{
    getAllAgen(): Promise<Agen[]>
    getAllFindNama(Agen_Name: string): Promise<Agen[]>
    getAllFindId(AgenID: string): Promise<Agen[]>
    getAllFindKota(Kota: string): Promise<Agen[]>
    getAllFindSales(SalesID: string): Promise<Agen[]>
    getnamaAgen(): Promise<Agen[]>
    getKotaAgen(): Promise<Agen[]>
    searchNama(Agen_Name: string): Promise<Agen[]>
    search(query: string): Promise<Agen[]>
    getAgenFindbynama(Agen_Name: string): Promise<Agen[]>
    addAgen(entity: Agen): Promise<Agen>
    updateAgen(entity: Agen): Promise<void>
    deleteAgen(entity: Agen): Promise<void>

    cekketergantunganData(AgenID: string): Promise<Boolean>
}

export default IAgenRepository;