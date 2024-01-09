import CustomerNakamiController from "../Controllers/CustomerNakamiController";
import CustomerNakamiRepository from "../Repositories/Repository/CustomerNakamiRepository";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import CustomerNakamiService from "../Services/Service/CustomerNakamiService";
import { auth } from "../middlewares/LoginValidator";
import BaseRoutes from "./BaseRouters";

interface ICustomerNakamiRoutes {
    routes(): void;
}

class CustomerNakamiRoutes extends BaseRoutes{
    public routes(): void{
        const uow = new UnitOfWork();
        const custrepos = new CustomerNakamiRepository();
        const custservice = new CustomerNakamiService(uow, custrepos);
        const custcontroller = new CustomerNakamiController(custservice);

        this.router.get("/Api/CustNakami/Count",auth, (req, res) => custcontroller.count(res));
        this.router.get("/Api/CustNakami/GetAllbyCust/:Customer",auth, (req, res) => custcontroller.getallbyCust(req, res));
        this.router.get("/Api/CustNakami/getCurrent", auth, (req,res) => custcontroller.getcurrent(req,res));
        this.router.get("/Api/CustNakami/SearchAllCust/:search", auth, (req,res) => custcontroller.searchallCust(req,res));
        this.router.get("/Api/CustNakami/GetId",auth, (req, res) => custcontroller.getid(res));
        this.router.get("/Api/CustNakami/GetKota",auth, (req, res) => custcontroller.getkota(res));
        this.router.get("/Api/CustNakami/selectTop",auth, (req, res) => custcontroller.gettop(res));
        this.router.get("/Api/CustNakami/getbyagenid/:Id",auth, (req, res) => custcontroller.getbyagenid(req, res));
        this.router.post("/Api/CustNakami/AddCust",auth, (req, res) => custcontroller.create(req, res));
        this.router.put("/Api/CustNakami/Update/:id",auth, (req, res) => custcontroller.update(req, res));
    };
};

export default new CustomerNakamiRoutes().router;