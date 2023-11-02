import { AgenVM, Agen_NameVM, SaveAgenVM } from "../../Database/Models/MAgen"

interface IAgenService {
    getAllAgen(): Promise<AgenVM[]>
    getAllfindNama(Agen_Name:string):Promise<string|AgenVM[]>
    getAgenName(): Promise<AgenVM[]>
    getKotaAgen():Promise<AgenVM[]>
    searchAgenName(Agen_Name:string): Promise<AgenVM[]>
    search(query:string):Promise<AgenVM[]>
    getAgenFindbyNama(Agen_Name:string): Promise<string|AgenVM[]>
    addAgen(entity: SaveAgenVM): Promise<boolean|null>
    updateAgen(AgenName: string, AgenID: string, entity: SaveAgenVM): Promise<boolean>
    deleteAgen(AgenId: string, Agen_Name:string, Kota: string, SalesID:string): Promise<Boolean>
};

export default IAgenService;