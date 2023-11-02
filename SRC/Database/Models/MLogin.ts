import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface ILogin {
    ID: number;
    Username: string;
    UsernameOld: string;
    Password: string;
    Role: string;
    Version: string;
    LastLogin: Date;
    PC: string;
    Status: string;
    LastLogout: Date;
    LastInput: Date;
    Q1: string;
    Q2: string;
    Q3: string;
};

export class Login extends Model<ILogin>{
    public ID?: number;
    public Username!: string;
    public UsernameOld!: string;
    public Password!: string;
    public Role!: string;
    public Version!: string;
    public LastLogin!: Date;
    public PC!: string;
    public Status!: string;
    public LastLogout!: Date;
    public LastInput!: Date;
    public Q1!: string;
    public Q2!: string;
    public Q3!: string;
};

Login.init({
    ID: {type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"},
    Username: {type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"},
    UsernameOld: { type: DataTypes.STRING, defaultValue: "NULL" },
    Password: {type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"},
    Role: {type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"},
    Version: {type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"},
    LastLogin: {type: DataTypes.DATE, allowNull: true,  defaultValue: "NULL"},
    PC: {type: DataTypes.STRING, allowNull: true,  defaultValue: "NULL"},
    Status: {type: DataTypes.STRING, allowNull: true,  defaultValue: "NULL"},
    LastLogout: {type: DataTypes.DATE, allowNull: true,  defaultValue: "NULL"},
    LastInput: {type: DataTypes.DATE, allowNull: true,  defaultValue: "NULL"},
    Q1: {type: DataTypes.STRING, allowNull: true,  defaultValue: "NULL"},
    Q2: {type: DataTypes.STRING, allowNull: true,  defaultValue: "NULL"},
    Q3: {type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"}
}, {
    timestamps: false, sequelize: Sql
});

export class LoginVM {
    public ID?: number;
    public Username!: string;
    public Password!: string;
    public Role!: string;
    public Version!: string;
    public LastLogin!: Date;
    public PC!: string;
    public Status!: string;
    public LastLogout!: Date;
    public LastInput!: Date;
    public Q1!: string;
    public Q2!: string;
    public Q3!: string;

    constructor(lgn: Login) {
        this.ID = lgn.ID;
        this.Username = lgn.Username;
        this.Password = lgn.Password;
        this.Role = lgn.Role;
        this.Version = lgn.Version;
        this.LastLogin = lgn.LastLogin;
        this.PC = lgn.PC;
        this.Status = lgn.Status;
        this.LastLogout = lgn.LastLogout;
        this.LastInput = lgn.LastInput;
        this.Q1 = lgn.Q1;
        this.Q2 = lgn.Q2;
        this.Q3 = lgn.Q3;
    }
};

export class SaveLoginVM{
    public ID?: number;
    public Username!: string;
    public Password!: string;
    public Role!: string;
    public Version!: string;
    public LastLogin!: Date;
    public PC!: string;
    public Status!: string;
    public LastLogout!: Date;
    public LastInput!: Date;
    public Q1!: string;
    public Q2!: string;
    public Q3!: string;

    constructor(lgn: Login) {
        this.ID = lgn.ID;
        this.Username = lgn.Username;
        this.Password = lgn.Password;
        this.Role = lgn.Role;
        this.Version = lgn.Version;
        this.LastLogin = lgn.LastLogin;
        this.PC = lgn.PC;
        this.Status = lgn.Status;
        this.LastLogout = lgn.LastLogout;
        this.LastInput = lgn.LastInput;
        this.Q1 = lgn.Q1;
        this.Q2 = lgn.Q2;
        this.Q3 = lgn.Q3;
    }
};