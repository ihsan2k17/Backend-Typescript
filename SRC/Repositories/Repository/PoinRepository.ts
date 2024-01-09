import { QueryTypes } from "sequelize";
import { Poin } from "../../Database/Models/MPoin";
import Sql from "../../Database/Server/db_config";
import IPoinRepository from "../Interface/IPoinRepository";
import { injectable } from "inversify";
import poinQuery from "../../Database/query/poinquery";

@injectable()
class PoinRepository implements IPoinRepository {
    async cekMaksimum(PoinCust: number, Periode:number): Promise<Poin[]> {
        const cek = await Sql.query<Poin>(poinQuery.poincek,{
            replacements:{poin:PoinCust,periode:Periode},
            type:QueryTypes.SELECT
        });
        return cek;
    }
    
}

export default PoinRepository;