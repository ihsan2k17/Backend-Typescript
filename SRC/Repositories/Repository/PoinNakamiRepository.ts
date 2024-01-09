import { injectable } from "inversify";
import IPoinNakamiRepository from "../Interface/IPoinNakamiRepository";
import { Poin_Nakami } from "../../Database/Models/MPoin_Nakami";
import poinNakamiQuery from "../../Database/query/poinnakamiquery";
import Sql from "../../Database/Server/db_config";
import { QueryTypes } from "sequelize";

@injectable()

class PoinNakamiRepository implements IPoinNakamiRepository {
    async cekMaksimum(PoinCust: string, Periode: number): Promise<Poin_Nakami[]> {
        const cek = await Sql.query<Poin_Nakami>(poinNakamiQuery.poincek,{
            replacements:{poin:PoinCust,periode:Periode},
            type:QueryTypes.SELECT
        });
        return cek;
    }

}

export default PoinNakamiRepository