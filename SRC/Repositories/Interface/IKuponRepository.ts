import { Kupon } from "../../Database/Models/MKupon";

interface IKuponRepository {
    Listall(): Promise<Kupon[]>;
    cekKuponbyIddanPoin(ID: number, Poin:number, Hadiah:number, Tahun:number, User_Input:string, Periode:number): Promise<Kupon[]>;
    getIdKupon(ID:number):Promise<Kupon[]>;
    searchKupon(search: string): Promise<Kupon[]>;
    searchKuponDetail(ID: number, Poin:number, Nama_Hadiah: string, search: string): Promise<Kupon[]>;
    validasiKuponandPeriode(ID:number,Kupon:number, Periode:number):Promise<boolean>;
    validasiVoucherandPeriode(ID:number, Voucher:number, Periode:number):Promise<boolean>;
    
    selectId(ID: number): Promise<Kupon[]>;
    selectPoin(Poin: number): Promise<Kupon[]>;
    selectKupon(Kupon: number): Promise<Kupon[]>;
    selectVoucher(Voucher: number): Promise<Kupon[]>;
    selectHadiah(Hadiah:number) :Promise<Kupon[]>;
    selectUser(User_Input: string): Promise<Kupon[]>;
    createKupon(entity: Kupon): Promise<Kupon>;
    UpdateKupon(entity: Kupon): Promise<void>;
    UpdateVoucher(entity: Kupon): Promise<void>;
    DeleteKupon(entity:Kupon):Promise<void>;
    UpdateInputDuration(entity:Kupon) :Promise<void>;
    DeleteVoucher(entity:Kupon):Promise<void>;
}
export default IKuponRepository;