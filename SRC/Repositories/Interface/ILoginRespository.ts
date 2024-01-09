import { Login } from "../../Database/Models/MLogin";

interface ILoginRepository {
    Register(entity: Login): Promise<Login>
    Login(Username: string, Password: string): Promise<Login[]>
    allUser(): Promise<Login[]>
    Profile(Username: string): Promise<Login[]>
    LastLogin(entity: Login): Promise<void>
    LastLogout(entity: Login):Promise<void>
    lastInput(entity:Login):Promise<void>
    ForgetPassword(entity: Login): Promise<void>
    ForgetPassword2(entity: Login): Promise<void>
    CheckPass1(Username: string): Promise<Login[]>
    CheckPass2(Q1: string): Promise<Login[]>
    CheckPass3(Q2: string): Promise<Login[]>
    CheckPass4(Q3: string): Promise<Login[]>
}

export default ILoginRepository;