import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface IPoin_Nakami {
    PoinCust: string;
    PoinCustOld: string;
    Huruf: string;
    HurufOld: string;
    Minimum: number;
    Maksimum: number;
    Periode: number;
    Jenis: string;
};

export class Poin_Nakami extends Model<IPoin_Nakami>{
    public PoinCust!: string;
    public PoinCustOld!: string;
    public Huruf!: string;
    public HurufOld!: string;
    public Minimum?: number;
    public Maksimum?: number;
    public Periode?: number;
    public Jenis!: string;
}

Poin_Nakami.init({
    PoinCust: {
        type: DataTypes.STRING, allowNull: true, field: "Poin", defaultValue: "NULL"
    },
    PoinCustOld: {
        type: DataTypes.STRING, allowNull: true, field: "Poin", defaultValue: "NULL"
    },
    Huruf: {
        type: DataTypes.STRING, allowNull: true, field: "Huruf", defaultValue: "NULL"
    },
    HurufOld: {
        type: DataTypes.STRING, allowNull: true, field: "Huruf", defaultValue: "NULL"
    },
    Minimum: {
        type: DataTypes.INTEGER, allowNull: true, field: "Minimum", defaultValue: "NULL"
    },
    Maksimum: {
        type: DataTypes.INTEGER, allowNull: true, field: "Maksimum", defaultValue: "NULL"
    },
    Periode: {
        type: DataTypes.INTEGER, allowNull: true, field: "Periode", defaultValue: "NULL"
    },
    Jenis: {
        type: DataTypes.STRING, allowNull: true, field: "Jenis", defaultValue: "NULL"
    }
}, {
    timestamps: false,
    sequelize: Sql,
});

export class Poin_NakamiVM {
    public PoinCust!: string;
    public PoinCustOld!: string;
    public Huruf!: string;
    public HurufOld!: string;
    public Minimum?: number;
    public Maksimum?: number;
    public Periode?: number;
    public Jenis!: string;

    constructor(poin: Poin_Nakami) {
        this.PoinCust = poin.PoinCust;
        this.PoinCustOld = poin.PoinCustOld;
        this.Huruf = poin.HurufOld;
        this.Minimum = poin.Minimum;
        this.Maksimum = poin.Maksimum;
        this.Periode = poin.Periode;
        this.Jenis = poin.Jenis;
    };
};