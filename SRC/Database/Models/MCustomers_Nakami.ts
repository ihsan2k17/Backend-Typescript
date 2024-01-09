import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface ICustomer_Nakami {
    ID: number;
    IDold: number;
    TotalCountID: number;
    Customer: string;
    CustomerOld: string;
    Agen_Name:string;
    Nama: string;
    Alamat: string;
    HP: string;
    Email: string;
    AgenID: string;
    Status: string;
    SalesID: string;
    Kota: string;
    Whatsapp: string;
    Keterangan: string;
    Jenis: string;
    User_Input: string;
}

export class Customer_Nakami extends Model<ICustomer_Nakami>{
    public ID?: number;
    public IDold?: number;
    public TotalCountID?: number;
    public Customer!: string;
    public CustomerOld!: string;
    public Agen_Name!:string;
    public Nama!: string;
    public Alamat!: string;
    public HP!: string;
    public Email!: string;
    public AgenID!: string;
    public Status!: string;
    public SalesID!: string;
    public Kota!: string;
    public Whatsapp!: string;
    public Keterangan!: string;
    public Jenis!: string;
    public User_Input!: string;
}

Customer_Nakami.init({
    ID: {type:DataTypes.INTEGER},
    IDold: { type: DataTypes.INTEGER },
    TotalCountID:{type:DataTypes.NUMBER},
    Customer: {type:DataTypes.STRING},
    CustomerOld: {type:DataTypes.STRING},
    Agen_Name: {type:DataTypes.STRING},
    Nama: {type:DataTypes.STRING},
    Alamat: {type:DataTypes.STRING},
    HP: {type:DataTypes.STRING},
    Email: {type:DataTypes.STRING},
    AgenID: {type:DataTypes.STRING},
    Status: {type:DataTypes.STRING},
    SalesID: {type:DataTypes.STRING},
    Kota: {type:DataTypes.STRING},
    Whatsapp: {type:DataTypes.STRING},
    Keterangan: {type:DataTypes.STRING},
    Jenis: {type:DataTypes.STRING},
    User_Input: {type:DataTypes.STRING}
}, {
    timestamps: false,
    sequelize:Sql
})

export class Customer_NakamiVM {
    public ID?: number;
    public IDold?: number;
    public TotalCountID?: number;
    public Agen_Name!:string;
    public Customer!: string;
    public CustomerOld!: string;
    public Nama!: string;
    public Alamat!: string;
    public HP!: string;
    public Email!: string;
    public Agenid!: string;
    public Status!: string;
    public SalesId!: string;
    public Kota!: string;
    public Whatsapp!: string;
    public Keterangan!: string;
    public Jenis!: string;
    public User_Input!: string;

    constructor(cust: Customer_Nakami) {
        this.ID = cust.ID;
        this.IDold = cust.IDold;
        this.TotalCountID = cust.TotalCountID;
        this.Customer = cust.Customer;
        this.CustomerOld = cust.CustomerOld;
        this.Agen_Name = cust.Agen_Name; 
        this.Nama = cust.Nama;
        this.Alamat = cust.Alamat;
        this.HP = cust.HP;
        this.Email = cust.Email;
        this.Agenid = cust.AgenID;
        this.Status = cust.Status;
        this.SalesId = cust.SalesID;
        this.Kota = cust.Kota;
        this.Whatsapp = cust.Whatsapp;
        this.Keterangan = cust.Keterangan;
        this.Jenis = cust.Jenis;
        this.User_Input = cust.User_Input;
    }
}

export class SaveCustomer_NakamiVM {
    public ID?: number;
    public Customer!: string;
    public Nama!: string;
    public Alamat!: string;
    public HP!: string;
    public Email!: string;
    public AgenId!: string;
    public Status!: string;
    public SalesId!: string;
    public Kota!: string;
    public Whatsapp!: string;
    public Keterangan!: string;
    public Jenis!: string;
    public User_Input!: string;

    constructor(cust: Customer_Nakami) {
        this.ID = cust.ID;
        this.Customer = cust.Customer;
        this.Nama = cust.Nama;
        this.Alamat = cust.Alamat;
        this.HP = cust.HP;
        this.Email = cust.Email;
        this.AgenId = cust.AgenID;
        this.Status = cust.Status;
        this.SalesId = cust.SalesID;
        this.Kota = cust.Kota;
        this.Whatsapp = cust.Whatsapp;
        this.Keterangan = cust.Keterangan;
        this.Jenis = cust.Jenis;
        this.User_Input = cust.User_Input;
    }
}