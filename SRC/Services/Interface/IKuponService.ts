import { KuponVM, SaveKuponVM } from "../../Database/Models/MKupon";

interface IKuponService {
    Listall(): Promise<KuponVM[]>;
    cekKuponbyIddanPoin(ID: number, Poin:number, Hadiah:number, Tahun:number, User_Input:string, Periode:number): Promise<KuponVM[]>;
    cekIdKupon(ID:number): Promise<KuponVM[]>;
    searchKupon(search: string): Promise<KuponVM[]>;
    searchKuponDetail(ID: number, Poin:number, Nama_Hadiah: string, search: string ): Promise<KuponVM[]>;

    createKupon(entity: SaveKuponVM): Promise<boolean>;
    createVoucher(entity:SaveKuponVM):Promise<Boolean>;
    UpdateKupon(Id: number, poin: number, kupon: number, entity: SaveKuponVM):Promise<boolean>;
    UpdateVoucher(Id: number, poin: number, voucher: number, entity: SaveKuponVM):Promise<boolean>;
    UpdateInputDuration(Id:number, Poin:number, User_Input:string, Hadiah:number, Tanggal:string, entity:SaveKuponVM):Promise<boolean>;
    DeleteKupon(Id: number, poin: number, kupon: number):Promise<boolean>;
    DeleteVoucher(Id: number, poin: number, voucher: number):Promise<boolean>;
}

export default IKuponService;