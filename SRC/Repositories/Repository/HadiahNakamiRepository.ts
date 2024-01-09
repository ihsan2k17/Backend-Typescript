import { injectable } from "inversify";
import IHadiahNakamiRepository from "../Interface/IHadiahNakamiRepostiory";
import { Hadiah_Nakami } from "../../Database/Models/MHadiah_Nakami";
import Sql from "../../Database/Server/db_config";
import HadiahNakamiQuery from "../../Database/query/hadiahnakmaiquery";
import { QueryTypes } from "sequelize";

@injectable()

class HadiahNakamiRepository implements IHadiahNakamiRepository {
    async getallHadiah(): Promise<Hadiah_Nakami[]> {
        const getall = await Sql.query<Hadiah_Nakami>(
            HadiahNakamiQuery.hadiahQueryGetAll, {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
        });
        if (!Array.isArray(getall)) {
            throw new Error("Data tidak Ditemukan");
        }
        return getall
    }
    async getHadiahFindbyPoin(Poin_Hadiah: number): Promise<Hadiah_Nakami[]> {
        const gethadiah = await Sql.query<Hadiah_Nakami>(
            HadiahNakamiQuery.hadiahQuerygetHadiahFindbyPoin, {
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
    async getHadiahFindbyBarang(Barang: string): Promise<Hadiah_Nakami[]> {
        const brg = await Sql.query<Hadiah_Nakami>(HadiahNakamiQuery.hadiahSelectBarang, {
            replacements:{
                brg: Barang
            },
            type:QueryTypes.SELECT
        });
        return brg;
    }
    async getBarangHadiahbyPeriode(Periode: string): Promise<Hadiah_Nakami[]> {
        const gethadiah = await Sql.query<Hadiah_Nakami>(
            HadiahNakamiQuery.hadiahgetBarangHadiahbyPeriode, {
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
    async getperiode(): Promise<Hadiah_Nakami[]> {
        const periode = await Sql.query<Hadiah_Nakami>(
            HadiahNakamiQuery.hadiahgetperiode,{
            type:QueryTypes.SELECT,
            raw:true
        });
        return periode;
    }
    async getPoinHadiah(): Promise<Hadiah_Nakami[]> {
        const getPoin = await Sql.query<Hadiah_Nakami>(
            HadiahNakamiQuery.hadiahgetPoinHadiah,{
                type: QueryTypes.SELECT,
                raw:true
            }
        )
        return getPoin;
    }
    async addHadiah(entity: Hadiah_Nakami): Promise<Hadiah_Nakami> {
        await Sql.query(HadiahNakamiQuery.hadiahaddHadiah, {
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
    async updateHadiah(entity: Hadiah_Nakami): Promise<void> {
        const brgOld = entity.BarangOld;
        entity.BarangOld = entity.BarangOld || entity.Barang;
        await Sql.query(HadiahNakamiQuery.hadiahUpdate,{
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
    async deleteHadiah(entity: Hadiah_Nakami): Promise<void> {
        await Sql.query(HadiahNakamiQuery.hadiahdelete, {
            replacements:{
                barang: entity.Barang
            },
            type:QueryTypes.DELETE,
            raw:true
        });
    }

}

export default HadiahNakamiRepository