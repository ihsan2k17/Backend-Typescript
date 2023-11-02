import { Kupon } from "../../Database/Models/MKupon";

interface IKuponRepository {
    Listall(): Promise<Kupon[]>;
    cekKuponbyIddanPoin(ID: number, Poin: number): Promise<Kupon[]>;
    getIdKupon(ID:number):Promise<Kupon[]>;
    searchKupon(search: string): Promise<Kupon[]>;
    searchKuponDetail(ID: number, Poin:number, Nama_Hadiah: string, search: string): Promise<Kupon[]>;

    selectId(ID: number): Promise<Kupon[]>;
    selectPoin(Poin: number): Promise<Kupon[]>;
    selectKupon(Kupon: number): Promise<Kupon[]>;
    selectVoucher(Voucher: number): Promise<Kupon[]>;
    createKupon(entity: Kupon): Promise<Kupon>;
    UpdateKupon(entity: Kupon): Promise<void>;
    UpdateVoucher(entity: Kupon): Promise<void>;
}
export default IKuponRepository;