import { injectable } from "inversify";
import { Kupon } from "../../Database/Models/MKupon";
import IKuponRepository from "../Interface/IKuponRepository";
import Sql from "../../Database/Server/db_config";
import { QueryTypes } from "sequelize";
import { list } from "pm2";

@injectable()
class KuponRepository implements IKuponRepository{
    async Listall(): Promise<Kupon[]> {
        const list = await Sql.query<Kupon>(kuponQuery.kuponListall, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return list;
    }
    async getIdKupon(ID: number): Promise<Kupon[]> {
        const data = await Sql.query<Kupon>(kuponQuery.kupongetIdKupon, {
            replacements:{id:ID},
            type:QueryTypes.SELECT,
            raw:true
        });
        return data;
    }
    async cekKuponbyIddanPoin(ID: number, Poin:number): Promise<Kupon[]> {
        const list = await Sql.query<Kupon>(kuponQuery.kuponcekKuponbyIddanPoin, {
            replacements: { id: ID, poin: Poin },
            type: QueryTypes.SELECT,
            raw: true
        });
        return list;
    }

    async searchKupon(search: string): Promise<Kupon[]> {
        const list = await Sql.query<Kupon>(kuponQuery.kuponsearchKupon, {
            replacements: { id: `%${search}%`, customer:`%${search}%` },
            type: QueryTypes.SELECT,
            raw: true
        });
        return list;
    }

    async searchKuponDetail( ID: number, Poin: number, Nama_Hadiah: string, search: string,): Promise<Kupon[]> {
        const list= await Sql.query<Kupon>(kuponQuery.kuponsearchKuponDetail,{
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

    async selectVoucher(Voucher: number): Promise<Kupon[]> {
        const vcr = await Sql.query<Kupon>(kuponQuery.kuponselectVoucher, {
            replacements: {voucher: Voucher},
            type: QueryTypes.SELECT,
            raw: true
        });
        return vcr;
    }

    async selectKupon(Kupon: number): Promise<Kupon[]> {
        const kupon = await Sql.query<Kupon>(kuponQuery.kuponselectKupon, {
                replacements: {kupon: Kupon},
                type: QueryTypes.SELECT,
                raw: true,
        });
        return kupon;
    }

    async selectId(ID: number): Promise<Kupon[]> {
        const id = await Sql.query<Kupon>(kuponQuery.kuponselectId, {
            replacements: { id: ID },
            type: QueryTypes.SELECT,
            raw: true,
        });
        return id;
    }

    async selectPoin(Poin: number): Promise<Kupon[]> {
        const kpn = await Sql.query<Kupon>(kuponQuery.kuponselectPoin, {
            replacements: {poin:Poin},
            type: QueryTypes.SELECT,
            raw: true
        });
        return kpn;
    }

    async createKupon(entity: Kupon): Promise<Kupon> {
        await Sql.query(kuponQuery.kuponcreateKupon, {
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

    async UpdateKupon(entity: Kupon): Promise<void> {
        const OldKupon = entity.KuponOld;
        entity.KuponOld = entity.KuponOld || entity.Kupon;
        await Sql.query(kuponQuery.kuponUpdateKupon, {
            replacements: {
                kupon: entity.Kupon,
                hadiah: entity.Hadiah,
                namahadiah: entity.Nama_Hadiah,
                hadiahke: entity.Hadiah_ke,
                tahun: entity.Tahun,
                user: entity.User_Input,
                id: entity.ID,
                poin: entity.Poin,
                paramKupon: OldKupon
            },
            type: QueryTypes.UPDATE,
            raw: true
        });
    }

    async UpdateVoucher(entity: Kupon): Promise<void> {
        const OldVoucher = entity.VoucherOld;
        entity.VoucherOld = entity.VoucherOld || entity.Voucher;
        await Sql.query(kuponQuery.kuponUpdateVoucher, {
            replacements: {
                voucher: entity.Voucher,
                hadiah: entity.Hadiah,
                namahadiah: entity.Nama_Hadiah,
                hadiahke: entity.Hadiah_ke,
                tahun: entity.Tahun,
                user: entity.User_Input,
                id: entity.ID,
                poin: entity.Poin,
                paramvcr: OldVoucher
            },
            type: QueryTypes.UPDATE,
            raw: true
        });
    }
    
}

export default KuponRepository;