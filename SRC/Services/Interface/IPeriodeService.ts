import { PeriodeVM } from "../../Database/Models/MPeriode";

interface IPeriodeService {
    selectPeriode():Promise<PeriodeVM[]>
}

export default IPeriodeService;