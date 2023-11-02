import HadiahController from "../Controllers/HadiahController";
import HadiahRepository from "../Repositories/Repository/HadiahRepository";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import HadiahService from "../Services/Service/HadiahService";
import { auth } from "../middlewares/LoginValidator";
import BaseRoutes from "./BaseRouters";

interface IHadiahRoutes {
    routes(): void;
}

class HadiahRoutes extends BaseRoutes{
    public routes(): void {
        
        const uow = new UnitOfWork();
        const hadiahrepos = new HadiahRepository();
        const hadiahservice = new HadiahService(uow, hadiahrepos);
        const hadiahcontroller = new HadiahController(hadiahservice);

        this.router.get('/Api/Hadiah/GetAll', auth,(req, res) => hadiahcontroller.getall(res));
        this.router.get('/Api/Hadiah/GetPeriode', auth,(req, res) => hadiahcontroller.getPeriode(res));
        this.router.get('/Api/Hadiah/GetBarangHadiahPerPeriode/:Periode', auth, (req, res) => hadiahcontroller.getbarangByPeriode(req,res));
        this.router.get('/Api/Hadiah/GetPoinHadiah',auth,(req,res) => hadiahcontroller.getPoin(res));
        this.router.get('/Api/Hadiah/GetHadiahfindPoin/:Poin_Hadiah', auth,(req, res) => hadiahcontroller.findPoin(req, res));
    };
};

export default new HadiahRoutes().router;