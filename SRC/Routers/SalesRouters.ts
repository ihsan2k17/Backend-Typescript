import BaseRoutes from "./BaseRouters";
import SalesController from "../Controllers/SalesController";
import SalesServ from "../Services/Service/SalesService";
import SalesRepository from "../Repositories/Repository/SalesRepository";
import { or } from "sequelize";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import { auth } from "../middlewares/LoginValidator";

interface ISalesRoutes {
    routes(): void;
}

class SalesRoutes extends BaseRoutes {
    public routes(): void {
        const uow = new UnitOfWork()
        const salesrepost = new SalesRepository();
        const salesserv = new SalesServ(uow, salesrepost);
        const salescontroller = new SalesController(salesserv);

        this.router.get("/api/sales/getAll",auth, (req, res) => salescontroller.getsales(res));
        this.router.get("/api/sales/getname",auth, (req, res) => salescontroller.getname(res));
        this.router.get('/api/sales/search/:key',auth, (req, res) => salescontroller.search(req, res));
        this.router.post('/api/sales/create',auth, (req, res) => salescontroller.create(req, res));
        this.router.put('/api/sales/update/:namasales',auth, (req, res) => salescontroller.Update(req, res));
        this.router.delete(`/api/sales/delete/:id`,auth, (req, res) => salescontroller.delete(req, res));
        //this.router.get("/api/getname", (req, res) => salescontroller.getname(res, req.query.name));
    }
}

export default new SalesRoutes().router;
