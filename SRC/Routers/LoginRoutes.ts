import { Request, Response } from "express";
import LoginController from "../Controllers/LoginController";
import LoginRepository from "../Repositories/Repository/LoginRepository";
import UnitOfWork from "../Repositories/Repository/unitOfWork";
import LoginService from "../Services/Service/LoginService";
import  { CheckUsername, validate, auth, authLogout } from "../middlewares/LoginValidator";
import BaseRoutes from "./BaseRouters";

interface ILoginRoutes {
    routes(): void;
}

class LoginRoutes extends BaseRoutes {
    public routes(): void {
        const uow = new UnitOfWork();
        const loginrepos = new LoginRepository();
        const loginservice = new LoginService(uow, loginrepos);
        const logincontroller = new LoginController(loginservice);

        this.router.post('/Api/login/login', validate,
            (req: Request, res: Response) => logincontroller.Login(req, res));
        this.router.put('/Api/Login/LastLogin', auth, 
            (req:Request,res:Response) => logincontroller.lastLogin(req,res))
        this.router.post('/Api/Login/Registrasi', validate, CheckUsername,
            (req: Request, res: Response) => logincontroller.Register(req, res));
        this.router.get('/Api/Login/Profile', auth,
            (req: Request, res: Response) => logincontroller.Profile(req, res));
        this.router.get('/Api/Login/Logout', authLogout,
            (req: Request, res: Response) => logincontroller.Logout(req, res));
        this.router.get('/Api/Login/alluser',auth, (req, res) => logincontroller.allUser(req,res));
        this.router.put('/Api/Login/LastInput/:Username',auth,(req,res) =>  logincontroller.LastInput(req,res))
        
    }
}

export default new LoginRoutes().router;