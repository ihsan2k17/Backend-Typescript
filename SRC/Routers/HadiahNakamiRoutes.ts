import HadiahNakamiController from "../Controllers/HadiahNakamiController";
import HadiahNakamiRepository from "../Repositories/Repository/HadiahNakamiRepository";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import HadiahNakamiService from "../Services/Service/HadiahNakamiService";
import { auth } from "../middlewares/LoginValidator";
import BaseRoutes from "./BaseRouters";

interface IHadiahNakamiRoutes {
    routes(): void;
}

class HadiahNakamiRoutes extends BaseRoutes {
    public routes(): void {
        const uow = new UnitOfWork();
        const hadiahrepos = new HadiahNakamiRepository();
        const hadiahservice = new HadiahNakamiService(uow, hadiahrepos);
        const hadiahcontroller = new HadiahNakamiController(hadiahservice);

        this.router.get('/Api/HadiahNakami/GetAll', auth,(req, res) => hadiahcontroller.getall(res));
        this.router.get('/Api/HadiahNakami/GetPeriode', auth,(req, res) => hadiahcontroller.getPeriode(res));
        this.router.get('/Api/HadiahNakami/GetBarangHadiahPerPeriode/:Periode', auth, (req, res) => hadiahcontroller.getbarangByPeriode(req,res));
        this.router.get('/Api/HadiahNakami/GetPoinHadiah',auth,(req,res) => hadiahcontroller.getPoin(res));
        this.router.get('/Api/HadiahNakami/GetHadiahfindPoin/:Poin_Hadiah', auth,(req, res) => hadiahcontroller.findPoin(req, res));
        this.router.get('/Api/HadiahNakami/GetPoinByBarang/:Barang',auth,(req,res) => hadiahcontroller.getPoinByBarang(req,res));
        this.router.post('/Api/HadiahNakami/addHadiah', auth, (req, res) => hadiahcontroller.add(req,res));
        this.router.delete('/Api/HadiahNakami/delete/:Barang', auth, (req, res) => hadiahcontroller.delete(req,res));
        this.router.put(`/Api/HadiahNakami/UpdateHadiah/:Barang`, auth,(req, res) => hadiahcontroller.update(req,res));
    }
    
}

export default new HadiahNakamiRoutes().router;