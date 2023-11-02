import KuponController from "../Controllers/KuponController";
import KuponRepository from "../Repositories/Repository/KuponRepository";
import PoinRepository from "../Repositories/Repository/PoinRepository";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import KuponService from "../Services/Service/KuponService";
import { auth } from "../middlewares/LoginValidator";
import BaseRoutes from "./BaseRouters";

interface IKuponRoutes {
    routes(): void;
}

class KuponRoutes extends BaseRoutes{
    public routes(): void{
        const uow = new UnitOfWork();
        const kuponrepos = new KuponRepository();
        const poinrepos = new PoinRepository();
        const kuponservice = new KuponService(uow, kuponrepos, poinrepos);
        const kuponcontroller = new KuponController(kuponservice);

        this.router.get('/Api/Kupon/list', auth, (req, res) => kuponcontroller.Listall(req, res));

        this.router.get(`/Api/Kupon/ListId/:ID/:Poin`, auth, 
            (req, res) => kuponcontroller.cekKupon(req, res));
        
        this.router.get(`/Api/Kupon/cekId/:ID`, auth, 
            (req, res) => kuponcontroller.cekid(req, res));

        this.router.get('/Api/Kupon/Search/:search',auth, 
            (req,res) => kuponcontroller.searchKupon(req,res));

        this.router.get(`/Api/Kupon/SearchKuponVoucher/:ID/:Poin/:Nama_Hadiah/:search`,auth, 
            (req,res) => kuponcontroller.searchKuponVoucher(req,res))

        this.router.post(`/Api/Kupon/InputKupon`, auth,
            (req, res) => kuponcontroller.addKupon(req, res));
        
        this.router.post(`/Api/Kupon/InputVoucher`, auth,
            (req, res) => kuponcontroller.addVoucher(req, res));
        
        this.router.put(`/Api/Kupon/UpdateKupon/:ID/:Poin/:KuponOld`, auth,
            (req, res) => kuponcontroller.updateKupon(req, res));
        
        this.router.put(`/Api/Kupon/UpdateVoucher/:ID/:Poin/:VoucherOld`, auth,
            (req, res) => kuponcontroller.updateVoucher(req, res));
    }
}

export default new KuponRoutes().router;