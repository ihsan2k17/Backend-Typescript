import { Kupon_NakamiVM, SaveKupon_NakamiVM } from "../../Database/Models/MKupon_Nakami";

interface IKuponNakamiService {
    Listall(): Promise<Kupon_NakamiVM[]>;
    cekKuponbyIddanPoin(ID: number, Poin:number, Hadiah:number, Tahun:number, User_Input:string, Periode:number): Promise<Kupon_NakamiVM[]>;
    cekIdKupon(ID:number): Promise<Kupon_NakamiVM[]>;
    searchKupon(search: string): Promise<Kupon_NakamiVM[]>;
    searchKuponDetail(ID: number, Poin:number, Nama_Hadiah: string, search: string ): Promise<Kupon_NakamiVM[]>;

    createKupon(entity: SaveKupon_NakamiVM): Promise<boolean>;
    createVoucher(entity:SaveKupon_NakamiVM):Promise<Boolean>;
    UpdateKupon(Id: number, poin: number, kupon: number, entity: SaveKupon_NakamiVM):Promise<boolean>;
    UpdateVoucher(Id: number, poin: number, voucher: number, entity: SaveKupon_NakamiVM):Promise<boolean>;
    updateDuration(Id:number, Poin:number, User_Input:string, Hadiah:number,Tanggal:string, entity:SaveKupon_NakamiVM): Promise<boolean>;
    DeleteKupon(Id: number, poin: number, kupon: number):Promise<boolean>;
    DeleteVoucher(Id: number, poin: number, voucher: number):Promise<boolean>;
}

export default IKuponNakamiService;