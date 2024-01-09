import { Kupon_Nakami } from "../../Database/Models/MKupon_Nakami";

interface IKuponNakamiRepository {
    Listall(): Promise<Kupon_Nakami[]>;
    cekKuponbyIddanPoin(ID: number, Poin:number, Hadiah:number, Tahun:number, User_Input:string, Periode:number): Promise<Kupon_Nakami[]>;
    getIdKupon(ID:number):Promise<Kupon_Nakami[]>;
    searchKupon(search: string): Promise<Kupon_Nakami[]>;
    searchKuponDetail(ID: number, Poin:number, Nama_Hadiah: string, search: string): Promise<Kupon_Nakami[]>;
    validasiKuponandPeriode(ID:number, Kupon:number, Periode:number):Promise<boolean>;
    validasiVoucherandPeriode(ID:number, Voucher:number, Periode:number):Promise<boolean>;
    
    selectId(ID: number): Promise<Kupon_Nakami[]>;
    selectPoin(Poin: number): Promise<Kupon_Nakami[]>;
    selectKupon(Kupon: number): Promise<Kupon_Nakami[]>;
    selectVoucher(Voucher: number): Promise<Kupon_Nakami[]>;
    selectHadiah(Hadiah:number): Promise<Kupon_Nakami[]>;
    selectUser(User_Input:string):Promise<Kupon_Nakami[]>;
    createKupon(entity: Kupon_Nakami): Promise<Kupon_Nakami>;

    UpdateDuration(entity:Kupon_Nakami):Promise<void>;
    UpdateKupon(entity: Kupon_Nakami): Promise<void>;
    UpdateVoucher(entity: Kupon_Nakami): Promise<void>;
    DeleteKupon(entity:Kupon_Nakami):Promise<void>;
    DeleteVoucher(entity:Kupon_Nakami):Promise<void>;
}

export default IKuponNakamiRepository