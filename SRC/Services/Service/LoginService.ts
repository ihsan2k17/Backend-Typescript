import { inject, injectable } from "inversify";
import ILoginService from "../Interface/ILoginService";
import { Login, LoginVM, SaveLoginVM } from "../../Database/Models/MLogin";
import { IUnitOfWork } from "../../Repositories/Interface/iUnitOfWork";
import ILoginRepository from "../../Repositories/Interface/ILoginRespository";
import Authentication from "../../middlewares/Authentication";
import bcrypt from 'bcrypt';

@injectable()

class LoginService implements ILoginService{

    private _unitofwork: IUnitOfWork;
    private _login: ILoginRepository;

    constructor(
        @inject("IUnitOfWork") unitofwork: IUnitOfWork,
        @inject("ILoginRepository") loginrepos: ILoginRepository)
    {
        this._unitofwork = unitofwork;
        this._login = loginrepos;
    }

    async Register(entity: SaveLoginVM): Promise<boolean> { 
        try {
            await this._unitofwork.beginTransaction()
            const newlogin: Login = Object.assign(new Login(), {
                ID: entity.ID,
                Username: entity.Username,
                Password: entity.Password,
                Role: entity.Role,
                Version: entity.Version,
                LastLogin: entity.LastLogin,
                PC: entity.PC,
                Status:entity.Status,
                LastLogout: entity.Last_Logout,
                LastInput: entity.LastInput,
                Q1: entity.Q1,
                Q2: entity.Q2,
                Q3: entity.Q3
            });
            const add = await this._login.Register(newlogin);
            await this._unitofwork.Save()
            const save: SaveLoginVM = new SaveLoginVM(add);
            console.log(save)
            return !!save;
        } catch (error) {
            await this._unitofwork.Dispose()
            throw error
        }
    }

    async Login(Username: string, Password: string): Promise<LoginVM[]> {
        if (!Username) {
            throw new Error("Isi Username Terlebih dahulu");
        } 
        if (!Password) {
            throw new Error("Isi Password Terlebih dahulu ");
        }
        const login = await this._login.Login(Username, Password);
        if (login.length > 0) {
            const storedPassword = login[0].Password; 
            const isBcryptHashed = Authentication.isPasswordHashed(storedPassword);
            if (isBcryptHashed) {
                const isPasswordCorrect = await Authentication.PasswordCompare(Password, storedPassword);
                if (isPasswordCorrect) {
                    return login;
                } else {
                    throw new Error("Username atau Password salah");
                }
            } else {
                if (Password === storedPassword) {
                    return login;
                } else {
                    throw new Error("Username atau Password salah");
                }
            }
        } else {
            throw new Error("Username atau Password salah");
        }
    };
    
    async Profile(Username: string): Promise<LoginVM[]> {
        if (!Username) {
            throw new Error(`${Username} tidak ada`);
        }
        const cekkupon = await this._login.Profile(Username);
        const response = cekkupon.map((lgn: Login) => {
            const vm = new LoginVM(lgn);
            return vm;
        });
        return response;
    }

    async allUser(): Promise<LoginVM[]> {
        const cek = await this._login.allUser();
        const response = cek.map((lgn:Login) => {
            const vm  = new LoginVM(lgn);
            return vm;
        });
        return response;
    }

    async UpdateLastLogin(Username: string, LastLogin: Date, PC:string, Status:string, Version:string): Promise<boolean> {
        try {
            await this._unitofwork.beginTransaction();
            const Data: Login = Object.assign(new Login(), {
                LastLogin: LastLogin,
                PC: PC,
                Status:Status,
                Version:Version,
                Username: Username
            });
            await this._login.LastLogin(Data);
            await this._unitofwork.Save();
            const simpan: SaveLoginVM = new SaveLoginVM(Data);
            if (simpan) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }
    async UpdateLastInput(Username: string, Last_Input: Date, Input_Duration:string): Promise<boolean> {
        try {
            await this._unitofwork.beginTransaction();
            const data: Login = Object.assign(new Login(),{
                LastInput:Last_Input,
                Input_Duration: Input_Duration,
                Username:Username
            });
            await this._login.lastInput(data);
            await this._unitofwork.Save();
            const simpan: SaveLoginVM = new SaveLoginVM(data);
            if (simpan) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }    
    }
    async Logout(Username: string, LastLogout: Date, Status: string): Promise<boolean> {
        try {
            await this._unitofwork.beginTransaction();
            const data: Login = Object.assign(new Login(), {
                Last_Logout: LastLogout,
                Status: Status,
                Username: Username
            });
            await this._login.LastLogout(data);
            await this._unitofwork.Save();
            const simpan: SaveLoginVM = new SaveLoginVM(data);
            if (simpan) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error;
        }
    }
    
    ForgetPassword(Username: string, entity: SaveLoginVM): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    ForgetPassword2(Q1: String, Q2: string, Q3: string, entity: SaveLoginVM): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}

export default LoginService;