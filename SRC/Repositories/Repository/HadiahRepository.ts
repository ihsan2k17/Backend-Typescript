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
    getHadiahFindbyBarang(Barang: string): Promise<Hadiah[]> {
        throw new Error("Method not implemented.");
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

    addHadiah(entity: Hadiah): Promise<Hadiah> {
        throw new Error("Method not implemented.");
    }
    updateHadiah(entity: Hadiah): Promise<Hadiah> {
        throw new Error("Method not implemented.");
    }
    
}

export default HadiahRepository;