import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import ILoginService from "../Services/Interface/ILoginService";
import Authentication from "../middlewares/Authentication";
import { SaveLoginVM } from "../Database/Models/MLogin";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
const os = require("os");

export interface ILoginController {
    Register(req: Request, res: Response): Promise<Response>
    Login(req: Request, res: Response): Promise<Response>
    //lastLogin(req: Request, res: Response): Promise<Response>
    Logout(req:Request, res:Response): Promise<Response>
    LastInput(req:Request, res:Response):Promise<Response>
    Profile(req: Request, res: Response): Promise<Response>
    Profile1(req:Request, res:Response): Promise<Response>
    allUser(req:Request, res:Response): Promise<Response>
    ForgetPassword(req: Request, res: Response): Promise<Response>
    ForgetPassword2(req: Request, res: Response): Promise<Response>
    
};

declare global {
    namespace Express {
        interface Request {
            User: {
                Username: string;
                ID: number;
                Role: string;
                Status: string;
                Version: string;
                
                // Tambahkan properti lain sesuai dengan struktur data user
            };
        }
    }
}

@injectable()
class LoginController implements ILoginController {
    private _login: ILoginService;
    constructor(
        @inject('ILoginService') slogin: ILoginService
    ) {
        this._login = slogin;
    }

    async Register(req: Request, res: Response): Promise<Response> {
        const { ID, Username, Password,PC, Q1, Q2, Q3 } = req.body as SaveLoginVM;
        try {
            const Hash: string = await Authentication.PaswordHash(Password);
            const daftar = await this._login.Register({
                ID,
                Username,
                Password: Hash,
                Q1,
                Q2,
                Q3,
                Role: 'User',
                Version: 'Api V1.0.0',
                LastLogin: new Date(),
                PC: PC,
                Status: 'Inactive',
                Last_Logout: new Date(),
                LastInput: new Date(),
                Input_Duration: '',
            });
            if (!daftar) {
                return res.status(402).json(`
                Register Gagal`)
            }
            return res.status(201).json({message:'Registrasi Sukses', daftar})
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    async Login(req: Request, res: Response): Promise<Response> {
        const { Username, Password, PC, Version } = req.body;
        try {
            const login = await this._login.Login(Username, Password);
            if (login) {
                const lastLogin = new Date();
                const Status = "Active"
                //const device = os.hostname()
                const id = login[0].ID!.toString();
                const Role = login[0].Role;
                const logout = login[0].Last_Logout;
                const dur = login[0].Input_Duration;
                
                const statusGenerateToken = login[0].Status
                const pcGenerateToken = login[0].PC
                await this._login.UpdateLastLogin(Username, lastLogin, PC, Status, Version);
                const token = Authentication.GenerateToken(
                    Username, Role, id,Status,PC, Version, lastLogin, logout, dur);
                return res.json({ token });
            } else {
                return res.status(401).json({ message: 'Authentikasi Gagal silahkan Coba lagi' });
            }
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).json({ message: `${error}` });
        }
    }

    async lastLogin(req: Request, res: Response): Promise<Response> {
        const { Username } = req.app.locals.credential;
        const {PC, Version} = req.body;
        const lastLogin = new Date();
        const Device = req.body;
        const Status = "Active"
        try {
            const lastlog = await this._login.UpdateLastLogin(Username, lastLogin, PC,Status, Version);
            if(lastlog) {
                console.log("last login sukses")
                return res.status(201).json(`Last Login: ${lastLogin}`)
            } else {
                console.error();
                return res.status(401).json({message:`ada sebuah kesalahan atau mungkin data belum di update`})
            }
        } catch (error) {
            return res.status(500).json({message: error})
        } 
    }

    async Logout(req: Request, res: Response): Promise<Response> {
        const { Username } = req.app.locals.credential;
        if (!Username) {
            return res.status(404).json(`Inauthorized`);
        }
        try {
            const LastLogout = new Date();
            const Status = "Inactive";
            const logout = await this._login.Logout(Username, LastLogout, Status);
            if(logout) {
                console.log('LogOut Sukses')
                return res.status(201).json(`LogOut Success`)
            } else {
                console.error();
                return res.status(401).json({message:`Logout Database Error`})
            }
        } catch (error) {
            return res.status(500).json({message: error})
        }
    }

    async LastInput(req: Request, res: Response): Promise<Response> {
        const User = req.app.locals.credential.Username;
        const {Input_Duration} = req.body as SaveLoginVM
        if(!User) {
            return res.status(404).json(`inauthorized`);
        }
        try {
            const lastinput= new Date();
            const upLast = await this._login.UpdateLastInput(User, lastinput, Input_Duration);
            if(upLast) {
                return res.status(201).json(`Last Input: ${lastinput}`)
            } else{
                return res.status(401).json({message:`ada sebuah kesalahan atau mungkin data belum di update`})
            }
        } catch (error) {
            return res.status(500).json({message: error})
        }
    }

    async Profile1(req: Request, res: Response): Promise<Response> {
        const Username = req.params.Username
        try {
            const profile = await this._login.Profile(Username);
            if (profile) {
                return res.status(200).json(profile);
            } else {
                return res.status(404).json({ message: 'Profile not found' });
            }
        } catch (error) {
            return res.status(500).json({message:`${error}`})
        }
    }

    async Profile(req: Request, res: Response): Promise<Response> {
        return res.send(req.app.locals.credential)
    }

    async allUser(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this._login.allUser()
        if(data) {
            return res.status(200).json(data);
        } else {
            return res.status(400).json({message:`not found`})
        }
        } catch (error) {
            return res.status(500).json({message:`${error}`})   
        }
    }

    ForgetPassword(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    ForgetPassword2(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    
}
export default LoginController;