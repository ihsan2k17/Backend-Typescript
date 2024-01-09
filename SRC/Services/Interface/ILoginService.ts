import { SaveAgenVM } from "../../Database/Models/MAgen";
import { LoginVM, SaveLoginVM } from "../../Database/Models/MLogin";

interface ILoginService {
    Register(entity: SaveLoginVM):Promise<boolean>
    Login(Username: string, Password: string): Promise<LoginVM[]>
    Profile(Username: string): Promise<LoginVM[]>
    allUser():Promise<LoginVM[]>
    UpdateLastLogin(Username: string, LastLogin: Date, PC: string, Status: string, Version: string): Promise<boolean>
    UpdateLastInput(Username:string, Last_Input:Date, Input_Duration: string): Promise<boolean>
    Logout(Username: string, LastLogout: Date, Status: string): Promise<boolean>
    ForgetPassword(Username: string, entity: SaveLoginVM): Promise<boolean>
    ForgetPassword2(Q1: String, Q2: string, Q3: string, entity: SaveLoginVM): Promise<boolean>

}

export default ILoginService;