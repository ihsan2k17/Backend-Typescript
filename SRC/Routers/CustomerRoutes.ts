import CustomerController from "../Controllers/CustomerController";
import CustomerRepository from "../Repositories/Repository/CustomerRepository";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import CustomerService from "../Services/Service/CustomerService";
import { auth } from "../middlewares/LoginValidator";
import BaseRoutes from "./BaseRouters";

interface ICustomerRoutes {
    routes(): void;
}

class CustomerRoutes extends BaseRoutes{
    public routes(): void{
        const uow = new UnitOfWork();
        const custrepos = new CustomerRepository();
        const custservice = new CustomerService(uow, custrepos);
        const custcontroller = new CustomerController(custservice);

        this.router.get("/Api/Cust/Count",auth, (req, res) => custcontroller.count(res));
        this.router.get("/Api/Cust/GetAllbyCust/:Customer",auth, (req, res) => custcontroller.getallbyCust(req, res));
        this.router.get("/Api/Cust/getCurrent", auth, (req,res) => custcontroller.getcurrent(req,res));
        this.router.get("/Api/Cust/SearchAllCust/:search", auth, (req,res) => custcontroller.searchallCust(req,res));
        this.router.get("/Api/Cust/GetId",auth, (req, res) => custcontroller.getid(res));
        this.router.get("/Api/Cust/GetKota",auth, (req, res) => custcontroller.getkota(res));
        this.router.get("/Api/Cust/selectTop",auth, (req, res) => custcontroller.gettop(res));
        this.router.get("/Api/Cust/getbyagenid/:Id",auth, (req, res) => custcontroller.getbyagenid(req, res));
        this.router.post("/Api/Cust/AddCust",auth, (req, res) => custcontroller.create(req, res));
        this.router.put("/Api/Cust/Update/:id",auth, (req, res) => custcontroller.update(req, res));
    };
};

export default new CustomerRoutes().router;