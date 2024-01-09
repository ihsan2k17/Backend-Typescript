import AgenController from "../Controllers/AgenController";
import AgenRepository from "../Repositories/Repository/AgenRepository";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import AgenService from "../Services/Service/AgenService";
import { auth } from "../middlewares/LoginValidator";
import BaseRoutes from "./BaseRouters";

interface IAgenRoutes {
    routes(): void;
}

class AgenRoutes extends BaseRoutes{
    public routes(): void {
        const uow = new UnitOfWork();
        const agenrepos = new AgenRepository();
        const agenservice = new AgenService(uow, agenrepos);
        const agencontroller = new AgenController(agenservice);
        

        this.router.get("/Api/Agen/GetAll",auth, (req, res) => agencontroller.getAll(res));
        this.router.get("/Api/Agen/GetAllNama/:Agen_Name",auth, (req, res) => agencontroller.getallnama(req, res));
        this.router.get("/Api/Agen/GetNama",auth, (req, res) => agencontroller.getname(res));
        this.router.get("/Api/Agen/GetKotaAgen", auth, (req,res) => agencontroller.getkota(res));
        this.router.get("/Api/Agen/searchName/:Agen_Name", auth, (req,res) => agencontroller.searchName(req,res));
        this.router.get("/Api/Agen/searchAgen/:query", auth, (req, res)=> agencontroller.search(req,res));
        this.router.get("/Api/Agen/GetNameFindName/:Agen_Name",auth, (req, res) => agencontroller.findname(req, res));
        this.router.post("/Api/Agen/CreateAgen",auth, (req, res) => agencontroller.create(req, res));
        this.router.put("/Api/Agen/Update/:AgenID/:Agen_Name",auth, (req, res) => agencontroller.Update(req, res));
        this.router.delete("/Api/Agen/Delete/:AgenID/:Agen_Name/:Kota/:SalesID",auth, (req, res) => agencontroller.delete(req, res));
    }
    
};

export default new AgenRoutes().router;