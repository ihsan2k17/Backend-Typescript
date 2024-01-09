import KuponNakamiController from "../Controllers/KuponNakamiController";
import KuponNakamiRepository from "../Repositories/Repository/KuponNakamiRepository";
import PoinNakamiRepository from "../Repositories/Repository/PoinNakamiRepository";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import KuponNakamiService from "../Services/Service/KuponNakamiService";
import { auth } from "../middlewares/LoginValidator";
import BaseRoutes from "./BaseRouters";

interface IKuponNakamiRoutes {
    routes():void;
}

class KuponNakamiRoutes extends BaseRoutes {
    public routes(): void{
        const uow = new UnitOfWork();
        const kuponrepos = new KuponNakamiRepository();
        const poinrepos = new PoinNakamiRepository();
        const kuponservice = new KuponNakamiService(uow, kuponrepos, poinrepos);
        const kuponcontroller = new KuponNakamiController(kuponservice);

        this.router.get('/Api/KuponNakami/list', auth, 
            (req, res) => kuponcontroller.Listall(req, res));
        
        this.router.get(`/Api/KuponNakami/ListId/:ID/:Poin/:Hadiah/:Tahun/:User_Input/:Periode`, auth, 
            (req, res) => kuponcontroller.cekKupon(req, res));

        this.router.get(`/Api/KuponNakami/cekId/:ID`, auth, 
            (req, res) => kuponcontroller.cekid(req, res));
        
        this.router.get('/Api/KuponNakami/Search/:search',auth, 
            (req,res) => kuponcontroller.searchKupon(req,res));

        this.router.get(`/Api/KuponNakami/SearchKuponVoucher/:ID/:Poin/:Nama_Hadiah/:search`,auth, 
            (req,res) => kuponcontroller.searchKuponVoucher(req,res))

        this.router.post(`/Api/KuponNakami/InputKupon`, auth,
            (req, res) => kuponcontroller.addKupon(req, res));
        
        this.router.post(`/Api/KuponNakami/InputVoucher`, auth,
            (req, res) => kuponcontroller.addVoucher(req, res));
        
        this.router.put(`/Api/KuponNakami/UpdateKupon/:ID/:Poin/:KuponOld`, auth,
            (req, res) => kuponcontroller.updateKupon(req, res));
        
        this.router.put(`/Api/KuponNakami/UpdateVoucher/:ID/:Poin/:VoucherOld`, auth,
            (req, res) => kuponcontroller.updateVoucher(req, res));
        
        this.router.put(`/Api/KuponNakami/UpDur/:ID/:Poin/:User_Input/:Hadiah`, auth, 
            (req, res) => kuponcontroller.updateDuration(req,res));

        this.router.delete(`/Api/KuponNakami/DeleteKupon/:ID/:Poin/:Kupon`, auth,
            (req,res) => kuponcontroller.deleteKupon(req,res));
        
        this.router.delete(`/Api/KuponNakami/DeleteVoucher/:ID/:Poin/:Voucher`, auth, 
            (req,res) => kuponcontroller.deleteVoucher(req,res));
    }
}

export default new KuponNakamiRoutes().router;