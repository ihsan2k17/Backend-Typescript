import { injectable } from "inversify";
import IHadiahRepository from "../Interface/IHadiahRepository";
import { Hadiah } from "../../Database/Models/MHadiah";
import Sql from "../../Database/Server/db_config";
import { QueryTypes } from "sequelize";
import HadiahQuery from "../../Database/query/hadiahquery";

@injectable()
class HadiahRepository implements IHadiahRepository{
    async getallHadiah(): Promise<Hadiah[]> {
        const getall = await Sql.query<Hadiah>(
            HadiahQuery.hadiahQueryGetAll, {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
        });
        if (!Array.isArray(getall)) {
            throw new Error("Data tidak Ditemukan");
        }
        return getall
    };

    async getHadiahFindbyPoin(Poin_Hadiah: number): Promise<Hadiah[]> {
        const gethadiah = await Sql.query<Hadiah>(
            HadiahQuery.hadiahQuerygetHadiahFindbyPoin, {
                replacements: { poin: Poin_Hadiah },
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true,
        });
        if (!Array.isArray(gethadiah)) {
            throw new Error("Poin"+ Poin_Hadiah +" tidak ditemukan");
        };
        return gethadiah;
    }
    async getHadiahFindbyBarang(Barang: string): Promise<Hadiah[]> {
        const brg = await Sql.query<Hadiah>(HadiahQuery.hadiahSelectBarang, {
            replacements:{
                brg: Barang
            },
            type:QueryTypes.SELECT
        });
        return brg;
    }
    async getBarangHadiahbyPeriode(Periode:string): Promise<Hadiah[]> {
        const gethadiah = await Sql.query<Hadiah>(
            HadiahQuery.hadiahgetBarangHadiahbyPeriode, {
            replacements:{periode: Periode},
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        if (!Array.isArray(gethadiah)) {
            throw new Error("Hadiah Tidak Ditemukan");
        }
        return gethadiah;
    }

    async getperiode(): Promise<Hadiah[]> {
        const periode = await Sql.query<Hadiah>(
            HadiahQuery.hadiahgetperiode,{
            type:QueryTypes.SELECT,
            raw:true
        });
        return periode;
    }

    async getPoinHadiah(): Promise<Hadiah[]> {
        const getPoin = await Sql.query<Hadiah>(
            HadiahQuery.hadiahgetPoinHadiah,{
                type: QueryTypes.SELECT,
                raw:true
            }
        )
        return getPoin;
    }

    async addHadiah(entity: Hadiah): Promise<Hadiah> {
        await Sql.query(HadiahQuery.hadiahaddHadiah, {
            replacements:{
                poin:entity.Poin_Hadiah,
                brg:entity.Barang,
                period:entity.Periode,
                jns:entity.Jenis
            },
            type:QueryTypes.INSERT,
            raw:true
        });
        return entity;
    }
    async updateHadiah(entity: Hadiah): Promise<void> {
        const brgOld = entity.BarangOld;
        entity.BarangOld = entity.BarangOld || entity.Barang;
        await Sql.query(HadiahQuery.hadiahUpdate,{
            replacements:{
                poin: entity.Poin_Hadiah,
                barang: entity.Barang,
                periode: entity.Periode,
                jenis: entity.Jenis,
                brgold: brgOld
            },
            type : QueryTypes.UPDATE,
            raw:true
        }) 
    }
    async deleteHadiah(entity: Hadiah): Promise<void> {
        await Sql.query(HadiahQuery.hadiahdelete, {
            replacements:{
                barang: entity.Barang
            },
            type:QueryTypes.DELETE,
            raw:true
        });
        
    }
    
}

export default HadiahRepository;