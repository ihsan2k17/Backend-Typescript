import { injectable } from "inversify";
import IKuponNakamiRepository from "../Interface/IKuponNakamiRepository";
import { Kupon_Nakami } from "../../Database/Models/MKupon_Nakami";
import Sql from "../../Database/Server/db_config";
import KuponNakamiQuery from "../../Database/query/kuponnakamiquery";
import { QueryTypes } from "sequelize";

@injectable()
class KuponNakamiRepository implements IKuponNakamiRepository {
    async Listall(): Promise<Kupon_Nakami[]> {
        const list = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponListall, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return list;
    }
    async cekKuponbyIddanPoin(ID: number,Poin:number, Hadiah:number, Tahun:number, User_Input:string, Periode:number): Promise<Kupon_Nakami[]> {
        const list = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponcekKuponbyIddanPoin, {
            replacements: { 
                id: ID, 
                poin:Poin,
                hadiah:Hadiah,
                tahun:Tahun,
                usrinput: User_Input,
                periode:Periode },
            type: QueryTypes.SELECT,
            raw: true
        });
        return list;
    }
    async getIdKupon(ID:number): Promise<Kupon_Nakami[]> {
        const data = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kupongetIdKupon, {
            replacements:{
                id:ID,
                
            },
            type:QueryTypes.SELECT,
            raw:true
        });
        return data;
    }
    async searchKupon(search: string): Promise<Kupon_Nakami[]> {
        const list = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponsearchKupon, {
            replacements: { id: `%${search}%`, customer:`%${search}%` },
            type: QueryTypes.SELECT,
            raw: true
        });
        return list;
    }
    async searchKuponDetail(ID: number, Poin: number, Nama_Hadiah: string, search: string): Promise<Kupon_Nakami[]> {
        const list= await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponsearchKuponDetail,{
            replacements:{
                id: ID,
                poin: Poin,
                namahadiah: Nama_Hadiah,
                kupon: `%${search}%`,
                voucher: `%${search}%`
        },
            type: QueryTypes.SELECT,
            raw:true
        });
        return list;
    }
    async validasiKuponandPeriode(ID:number, Kupon: number, Periode: number): Promise<boolean> {
        const kpn = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponValidasiKuponPeriode,{
            replacements:{id:ID, kpn:Kupon,periode:Periode},
            type: QueryTypes.SELECT,
            raw:true
        });
        return kpn.length > 0;
    }
    async validasiVoucherandPeriode(ID:number, Voucher: number, Periode: number): Promise<boolean> {
        const vcr = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponValidasiVoucherPeriode,{
            replacements:{id:ID, vcr:Voucher,periode:Periode},
            type: QueryTypes.SELECT,
            raw:true
        });
        return vcr.length > 0;
    }
    async selectId(ID: number): Promise<Kupon_Nakami[]> {
        const id = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponselectId, {
            replacements: { id: ID },
            type: QueryTypes.SELECT,
            raw: true,
        });
        return id;
    }
    async selectPoin(Poin: number): Promise<Kupon_Nakami[]> {
        const kpn = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponselectPoin, {
            replacements: {poin:Poin},
            type: QueryTypes.SELECT,
            raw: true
        });
        return kpn;
    }
    async selectKupon(Kupon: number): Promise<Kupon_Nakami[]> {
        const kupon = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponselectKupon, {
            replacements: {kupon: Kupon},
            type: QueryTypes.SELECT,
            raw: true,
        });
        return kupon;
    }
    async selectVoucher(Voucher: number): Promise<Kupon_Nakami[]> {
        const vcr = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponselectVoucher, {
            replacements: {voucher: Voucher},
            type: QueryTypes.SELECT,
            raw: true
        });
        return vcr;
    }
    async selectHadiah(Hadiah: number): Promise<Kupon_Nakami[]> {
        const hdh = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponselectHadiah, {
            replacements: {hdh: Hadiah},
            type: QueryTypes.SELECT,
            raw: true
        });
        return hdh;
    }
    async selectUser(User_Input: string): Promise<Kupon_Nakami[]> {
        const usr = await Sql.query<Kupon_Nakami>(KuponNakamiQuery.kuponselectUserInput, {
            replacements: {user: User_Input},
            type: QueryTypes.SELECT,
            raw: true
        });
        return usr;
    }

    async createKupon(entity: Kupon_Nakami): Promise<Kupon_Nakami> {
        await Sql.query(KuponNakamiQuery.kuponcreateKupon, {
            replacements: {
                id: entity.ID,
                kpn: entity.Kupon,
                vcr: entity.Voucher,
                poin: entity.Poin,
                tahun: entity.Tahun,
                hadiahke: entity.Hadiah_ke,
                hadiah: entity.Hadiah,
                namahadiah: entity.Nama_Hadiah,
                tanggalinput: entity.Tanggal_Input,
                tanggal: entity.Tanggal,
                user: entity.User_Input,
                periode: entity.Periode,
                jenis: entity.Jenis
            },
            type: QueryTypes.INSERT,
            raw: true
        });
        return entity;
    }

    async UpdateDuration(entity: Kupon_Nakami): Promise<void> {
        await Sql.query(KuponNakamiQuery.kuponUpdateInputDuration,{
            replacements:{
                input:entity.Input_Duration,
                id:entity.ID,
                user:entity.User_Input,
                tgl:entity.Tanggal
            },
            type:QueryTypes.UPDATE,
            raw:true
        });
    }
    async UpdateKupon(entity: Kupon_Nakami): Promise<void> {
        const OldKupon = entity.KuponOld;
        entity.KuponOld = entity.KuponOld || entity.Kupon;
        await Sql.query(KuponNakamiQuery.kuponUpdateKupon, {
            replacements: {
                kupon: entity.Kupon,
                hadiah: entity.Hadiah,
                namahadiah: entity.Nama_Hadiah,
                hadiahke: entity.Hadiah_ke,
                tahun: entity.Tahun,
                user: entity.User_Input,
                periode: entity.Periode,
                id: entity.ID,
                poin: entity.Poin,
                paramKupon: OldKupon
            },
            type: QueryTypes.UPDATE,
            raw: true
        });
    }
    async UpdateVoucher(entity: Kupon_Nakami): Promise<void> {
        const OldVoucher = entity.VoucherOld;
        entity.VoucherOld = entity.VoucherOld || entity.Voucher;
        await Sql.query(KuponNakamiQuery.kuponUpdateVoucher, {
            replacements: {
                voucher: entity.Voucher,
                hadiah: entity.Hadiah,
                namahadiah: entity.Nama_Hadiah,
                hadiahke: entity.Hadiah_ke,
                tahun: entity.Tahun,
                user: entity.User_Input,
                periode: entity.Periode,
                id: entity.ID,
                poin: entity.Poin,
                paramvcr: OldVoucher
            },
            type: QueryTypes.UPDATE,
            raw: true
        });
    }
    async DeleteKupon(entity: Kupon_Nakami): Promise<void> {
        await Sql.query(KuponNakamiQuery.deleteKupon, {
            replacements: {
                id: entity.ID,
                poin: entity.Poin,
                paramkupon: entity.Kupon
            },
            type:QueryTypes.DELETE,
            raw:true
        });
    }
    async DeleteVoucher(entity: Kupon_Nakami): Promise<void> {
        await Sql.query(KuponNakamiQuery.deleteVoucher, {
            replacements: {
                id: entity.ID,
                poin: entity.Poin,
                paramvcr: entity.Voucher
            },
            type:QueryTypes.DELETE,
            raw:true
        })
    }
}
export default KuponNakamiRepository;