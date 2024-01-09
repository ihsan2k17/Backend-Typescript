import { Periode } from "../../Database/Models/MPeriode"

interface IPeriodeRepository {
    selectPeriode():Promise<Periode[]>;
}

export default IPeriodeRepository