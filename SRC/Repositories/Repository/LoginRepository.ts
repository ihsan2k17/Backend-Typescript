import { injectable } from "inversify";
import ILoginRepository from "../Interface/ILoginRespository";
import { Login } from "../../Database/Models/MLogin";
import Sql from "../../Database/Server/db_config";
import { QueryTypes } from "sequelize";
import bcrypt from 'bcrypt'
import { raw } from "body-parser";
import loginQuery from "../../Database/query/loginquery";

@injectable()
class LoginRepository implements ILoginRepository {
    async Register(entity: Login): Promise<Login> {
        const add = await Sql.query(loginQuery.loginRegister, {
            replacements: {
                    id: entity.ID,
                    nama: entity.Username,
                    pass: entity.Password,
                    role: entity.Role,
                    versi: entity.Version,
                    lastlogin: entity.LastLogin,
                    pc: entity.PC,
                    status:entity.Status,
                    lastlogout: entity.Last_Logout,
                    lasinput: entity.LastInput,
                    q1:entity.Q1, q2:entity.Q2, q3: entity.Q3
            },
            type: QueryTypes.INSERT,
            raw:true
        });
        return entity;
    }
    async Login(Username: string, Password: string): Promise<Login[]> {
        const login = await Sql.query<Login>(loginQuery.loginLogin, {
            replacements: {
                username: Username,
            },
            type: QueryTypes.SELECT,
            raw: true
        });
        return login;
    }

    async Profile(Username: string): Promise<Login[]> {
        const login = await Sql.query<Login>(loginQuery.loginProfile, {
            replacements: { user: Username, },
            type: QueryTypes.SELECT,
            raw: true
        });
        return login;
    };

    async allUser(): Promise<Login[]> {
        const data = await Sql.query<Login>(loginQuery.loginallUser,{
            type:QueryTypes.SELECT,
            raw:true
        });
        return data;    
    };

    async LastLogin(entity:Login): Promise<void> {
        await Sql.query(loginQuery.loginLastLogin, {
            replacements: {
                lastLogin: entity.LastLogin,
                pc: entity.PC,
                status:entity.Status,
                versi:entity.Version,
                nama: entity.Username
            },
            type: QueryTypes.UPDATE,
            raw:true
        });
    };
    async LastLogout(entity: Login): Promise<void> {
        await Sql.query(loginQuery.loginLastLogout, {
            replacements: {
                logout: entity.Last_Logout,
                stats: entity.Status,
                nama: entity.Username
            },
            type: QueryTypes.UPDATE,
            raw:true
        })
    }

    async lastInput(entity: Login): Promise<void> {
        await Sql.query(loginQuery.updatelastinput,{
            replacements: {
                last: entity.LastInput,
                input: entity.Input_Duration,
                user: entity.Username
            },
            type:QueryTypes.UPDATE,
            raw:true
        })
    }

    async ForgetPassword(entity: Login): Promise<void> {
        const arrusername = entity.Username;
        await Sql.query(loginQuery.loginForgetPassword, {
            replacements: { password: entity.Password, username: arrusername },
            type: QueryTypes.UPDATE,
            raw: true
        });
    };

    async ForgetPassword2(entity: Login): Promise<void> {
        const arrQ1 = entity.Q1;
        const arrQ2 = entity.Q2;
        const arrQ3 = entity.Q3;
        await Sql.query(loginQuery.loginForgetPassword2, {
            replacements: {
                password: entity.Password,
                q1: `%${arrQ1}%`,
                q2: `%${arrQ2}%`,
                q3: `%${arrQ3}%`,
            },
            type: QueryTypes.UPDATE,
            raw: true
        });
    };

    async CheckPass1(Username: string): Promise<Login[]> {
        const cek = await Sql.query<Login>(
            loginQuery.loginCheckPass1, {
            replacements: { username: Username },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true,
        });
        return cek;
    }
    async CheckPass2(Q1: string): Promise<Login[]> {
        const cek = await Sql.query<Login>(loginQuery.loginCheckPass2, {
            replacements: { q1: Q1 },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return cek
    };

    async CheckPass3(Q2: string): Promise<Login[]> {
        const cek = await Sql.query<Login>(loginQuery.loginCheckPass3, {
            replacements: { q1: Q2 },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return cek
    };

    async CheckPass4(Q3: string): Promise<Login[]> {
        const cek = await Sql.query<Login>(loginQuery.loginCheckPass4, {
            replacements: { q1: Q3 },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        return cek
    };
    
}

export default LoginRepository;