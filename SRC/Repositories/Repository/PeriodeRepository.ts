import { injectable } from "inversify";
import { Periode } from "../../Database/Models/MPeriode";
import IPeriodeRepository from "../Interface/IPeriodeRepository";
import Sql from "../../Database/Server/db_config";
import PeriodeQuery from "../../Database/query/periodequery";
import { QueryTypes } from "sequelize";


@injectable()
class PeriodeRepository implements IPeriodeRepository {
    async selectPeriode(): Promise<Periode[]> {
        const periode = await Sql.query<Periode>(
            PeriodeQuery.getPeriode,{
            type:QueryTypes.SELECT,
            raw:true
        });
        return periode;
    }
}

export default PeriodeRepository