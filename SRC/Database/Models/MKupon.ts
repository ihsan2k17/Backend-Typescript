import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface IKupon {
    ID: number;
    NamaCustomer: string;
    Kupon: Number;
    KuponOld: number;
    Voucher: number;
    VoucherOld: number;
    Poin: number;
    Hadiah: number;
    Nama_Hadiah: string;
    Hadiah_ke: number;
    Tahun: number;
    User_Input: string;
    Tanggal: Date;
    Tanggal_Input: Date;
    Periode: number;
    Memo: string;
    Input_Duration:Date;
    Jenis: string;
    TotalPoin: number;
    JumlahLembarKupon: number;
    JumlahLembarVoucher: number;
};


export class Kupon extends Model<IKupon>{
    public ID?: number;
    public NamaCustomer!: string;
    public Kupon?: number|undefined;
    public KuponOld?: number;
    public Voucher?: number|undefined;
    public VoucherOld?: number;
    public Poin?: number;
    public Hadiah?: number;
    public Nama_Hadiah!: string;
    public Hadiah_ke?: number;
    public Tahun?: number;
    public User_Input!: string;
    public Tanggal!: string;
    public Tanggal_Input!: Date;
    public Periode?: number;
    public Memo!: string;
    public Jenis!: string;
    public Input_Duration!:Date;
    public TotalPoin?: number;
    public JumlahLembarKupon?: number;
    public JumlahLembarVoucher?: number;
};

Kupon.init({
    Kupon: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    KuponOld: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    ID: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    NamaCustomer:{
        type:DataTypes.STRING, allowNull: true, defaultValue:'NULL'
    },
    Voucher: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    VoucherOld: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    Poin: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    Hadiah: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    Nama_Hadiah: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    },
    Hadiah_ke: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    Tahun: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    User_Input: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    },
    Tanggal: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    },
    Tanggal_Input: {
        type: DataTypes.DATE, allowNull: true, defaultValue: "NULL"
    },
    Input_Duration:{
        type:DataTypes.TIME, allowNull:true, defaultValue:"NULL"
    },
    Periode: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    Memo: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    },
    Jenis: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    },
    TotalPoin:{type:DataTypes.INTEGER, allowNull: true},
    JumlahLembarKupon: {type: DataTypes.INTEGER, allowNull: true},
    JumlahLembarVoucher: {type:DataTypes.INTEGER, allowNull: true}
}, {
    timestamps: false,
    sequelize: Sql,
});

export class KuponVM {
    public ID?: number;
    public NamaCustomer!: string;
    public Kupon?: number;
    public Voucher?: number;
    public Poin?: number;
    public Hadiah?: number;
    public Nama_Hadiah!: string;
    public Hadiah_ke?: number;
    public Tahun?: number;
    public User_Input!: string;
    public Tanggal!: string;
    public Tanggal_Input!: Date;
    public Periode?: number;
    public Memo!: string;
    public Jenis!: string;
    public TotalPoin?: number;
    public Input_Duration!:Date;
    public JumlahLembarKupon?: number;
    public JumlahLembarVoucher?: number;

    constructor(kpn: Kupon) {
        this.ID = kpn.ID;
        this.NamaCustomer = kpn.NamaCustomer;
        this.Kupon = kpn.Kupon;
        this.Voucher = kpn.Voucher;
        this.Poin = kpn.Poin;
        this.Hadiah = kpn.Hadiah;
        this.Nama_Hadiah = kpn.Nama_Hadiah;
        this.Hadiah_ke = kpn.Hadiah_ke;
        this.Tahun = kpn.Tahun;
        this.User_Input = kpn.User_Input;
        this.Tanggal = kpn.Tanggal;
        this.Tanggal_Input = kpn.Tanggal_Input;
        this.Periode = kpn.Periode;
        this.Memo = kpn.Memo;
        this.Jenis = kpn.Jenis;
        this.TotalPoin = kpn.TotalPoin;
        this.Input_Duration = kpn.Input_Duration
        this.JumlahLembarKupon = kpn.JumlahLembarKupon;
        this.JumlahLembarVoucher = kpn.JumlahLembarVoucher;
    };
};

export class SaveKuponVM{
    public ID?: number;
    public Kupon?: number|null;
    public Voucher?: number|null;
    public Poin?: number;
    public Hadiah?: number;
    public Nama_Hadiah!: string;
    public Hadiah_ke?: number;
    public Tahun?: number;
    public User_Input!: string;
    public Tanggal!: string;
    public Tanggal_Input!: Date;
    public Periode?: number;
    public Memo!: string;
    public Jenis!: string;
    public Input_Duration!:Date;

    constructor(kpn: Kupon) {
        this.ID = kpn.ID;
        this.Kupon = kpn.Kupon;
        this.Voucher = kpn.Voucher;
        this.Poin = kpn.Poin;
        this.Hadiah = kpn.Hadiah;
        this.Nama_Hadiah = kpn.Nama_Hadiah;
        this.Hadiah_ke = kpn.Hadiah_ke;
        this.Tahun = kpn.Tahun;
        this.User_Input = kpn.User_Input;
        this.Tanggal = kpn.Tanggal;
        this.Tanggal_Input = kpn.Tanggal_Input;
        this.Periode = kpn.Periode;
        this.Memo = kpn.Memo;
        this.Jenis = kpn.Jenis;
        this.Input_Duration = kpn.Input_Duration;
    };
};
