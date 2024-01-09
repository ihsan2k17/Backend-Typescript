import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface IHadiah_Nakami {
    Poin_Hadiah: number;
    Poin_HadiahOld: number;
    Barang: string;
    BarangOld: string;
    Periode: string;
    Jenis: string;
};

export class Hadiah_Nakami extends Model<IHadiah_Nakami>{
    public Poin_Hadiah?: number;
    public Poin_HadiahOld?: number;
    public Barang!: string;
    public BarangOld!: string;
    public Periode!: string;
    public Jenis!: string;
};

Hadiah_Nakami.init({
    Poin_Hadiah: {
        type: DataTypes.INTEGER, allowNull: true, defaultValue: "NULL"
    },
    Poin_HadiahOld: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    },
    Barang: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    },
    BarangOld: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    },
    Periode: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    },
    Jenis: {
        type: DataTypes.STRING, allowNull: true, defaultValue: "NULL"
    }
}, {
    timestamps: false,
    sequelize: Sql,
});

export class Hadiah_NakamiVM {
    public Poin_Hadiah?: number;
    public Poin_HadiahOld?: number;
    public Barang!: string;
    public BarangOld!: string;
    public Periode!: string;
    public Jenis!: string;

    constructor(hadiah: Hadiah_Nakami) {
        this.Poin_Hadiah = hadiah.Poin_Hadiah;
        this.Poin_HadiahOld = hadiah.Poin_HadiahOld;
        this.Barang = hadiah.Barang;
        this.BarangOld = hadiah.BarangOld;
        this.Periode = hadiah.Periode;
        this.Jenis = hadiah.Jenis;
    }
};

export class SaveHadiah_NakamiVM {
    public Poin_Hadiah?: number;
    public Barang!: string;
    public Periode!: string;
    public Jenis!: string;

    constructor(hadiah: Hadiah_Nakami) {
        this.Poin_Hadiah = hadiah.Poin_Hadiah;
        this.Barang = hadiah.Barang;
        this.Periode = hadiah.Periode;
        this.Jenis = hadiah.Jenis;
    }
};
