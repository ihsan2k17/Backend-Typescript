import { injectable } from "inversify";
import IAgenRepository from "../Interface/IAgenNewRepository";
import { Agen } from "../../Database/Models/MAgen";
import Sql from "../../Database/Server/db_config";
import { QueryTypes } from "sequelize";
import agenQuery from "../../Database/query/agenquery";

@injectable()
class AgenRepository implements IAgenRepository{


    async getAllAgen(): Promise<Agen[]> {
        const getall = await Sql.query<Agen>(
            agenQuery.agengetAllAgen,
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw:true
            });
        if (!Array.isArray(getall)) {
            throw new Error('Data Agen tidak ditemukan'); // Melempar error jika hasilnya bukan array
        }

        return getall;
    };

    async getAllFindNama(Agen_Name: string): Promise<Agen[]> {
        const getNama = await Sql.query<Agen>(agenQuery.agengetAllFindNama, {
            replacements: { nama: Agen_Name },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return getNama;
    };

    async getAllFindId(AgenID: string): Promise<Agen[]> {
        const getID = await Sql.query<Agen>(agenQuery.agengetAllFindId, {
            replacements: { id: AgenID },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return getID;
    };

    async getAllFindKota(Kota: string): Promise<Agen[]> {
        const getKota = await Sql.query<Agen>(agenQuery.agengetAllFindKota, {
            replacements: { kota: Kota },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return getKota;
    };

    async getAllFindSales(SalesID: string): Promise<Agen[]> {
        const getKota = await Sql.query<Agen>(agenQuery.agengetAllFindSales, {
            replacements: { sls: SalesID },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return getKota;
    };

    async getnamaAgen(): Promise<Agen[]> {
        const getdata = await Sql.query<Agen>(agenQuery.agengetnamaAgen, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return getdata
    };

    async getKotaAgen(): Promise<Agen[]> {
        const getdata = await Sql.query<Agen>(agenQuery.agengetKotaAgen,{
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return getdata
    };

    async getAgenFindbynama(Agen_Name: string): Promise<Agen[]> {
        const findnama = await Sql.query<Agen>(agenQuery.agengetAllFindNama, {
            replacements:{ nama: Agen_Name},
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw:true
        });
        return findnama;
    };

    async searchNama(Agen_Name: string): Promise<Agen[]> {
        const getid = await Sql.query<Agen>(agenQuery.agensearchNama,{
            replacements:{nama: `%${Agen_Name}%`},
            type:QueryTypes.SELECT,
            raw: true
        });
        return getid;
    };

    async search(query:string): Promise<Agen[]> {
        const getid = await Sql.query<Agen>(agenQuery.agensearch,{
            replacements:{
                nama: `%${query}%`,
                idagen:`%${query}%`,
                idsales:`%${query}%`},
            type:QueryTypes.SELECT,
            raw: true
        });
        return getid;
    }

    async addAgen(entity: Agen): Promise<Agen> {
        const create = await Sql.query(agenQuery.agenaddAgen, {
            replacements: {
                agenid: entity.AgenID,
                agenname: entity.Agen_Name,
                kota: entity.Kota,
                salesid: entity.SalesID
            },
            type: QueryTypes.INSERT,
            raw:true
        });
        console.log(create);
        return entity;
    };

    async updateAgen(entity: Agen): Promise<void> {
        const namaOld = entity.Agen_Name;
        const idOld = entity.AgenID;
        entity.Agen_NameOld = entity.Agen_NameOld || entity.Agen_Name;
        entity.AgenID_Old = entity.AgenID_Old || entity.AgenID_Old;
        await Sql.query(agenQuery.agenupdateAgen, {
            replacements: {
                kota: entity.Kota,
                salesid: entity.SalesID,
                idold: idOld,
                namaold:namaOld
            },
            type: QueryTypes.UPDATE,
            raw:true
        })
    };

    async deleteAgen(entity: Agen): Promise<void> {
        await Sql.query(agenQuery.agendeleteAgen, {
            replacements: {
                nama: entity.Agen_Name,
                id: entity.AgenID,
                kota: entity.Kota,
                sls: entity.SalesID,
            },
            type: QueryTypes.DELETE,
            raw: true
        });
    };

    async cekketergantunganData(AgenID: string): Promise<boolean> {
        try {
            const customercekagenid: Array<{ count: number }> = await Sql.query(
                agenQuery.agencekketergantunganData,
                {
                    replacements: { agenid: AgenID },
                    type: QueryTypes.SELECT,
                    raw: true,
                }
            );
            const customercount = customercekagenid[0].count;
            return customercount > 0;
        } catch (error) {
            throw error;
        }
    }
};

export default AgenRepository;