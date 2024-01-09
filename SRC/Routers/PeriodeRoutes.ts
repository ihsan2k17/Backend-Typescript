import PeriodeController from "../Controllers/PeriodeController";
import PeriodeRepository from "../Repositories/Repository/PeriodeRepository";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import PeriodeService from "../Services/Service/PeriodeService";
import { auth } from "../middlewares/LoginValidator";
import BaseRoutes from "./BaseRouters";

interface IPeriodeRoutes {
    routes(): void;
}

class PeriodeRoutes extends BaseRoutes {
    public routes(): void {
        const uow = new UnitOfWork();
        const perioderepos = new PeriodeRepository();
        const periodeserv = new PeriodeService(uow, perioderepos);
        const periodeControll = new PeriodeController(periodeserv);

        this.router.get('/Api/Periode/GetAll', auth,(req, res) => periodeControll.selectPeriode(res));
    }
}
export default new PeriodeRoutes().router;