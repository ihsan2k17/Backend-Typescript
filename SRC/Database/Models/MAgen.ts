import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface IAgen {
    AgenID: string;
    AgenID_Old: string;
    Agen_Name: string;
    Agen_NameOld: string;
    Kota: string;
    Sales_Name: string;
    SalesID: string;
}

export class Agen extends Model<IAgen>{
    public AgenID!: string;
    public AgenID_Old!: string;
    public Agen_Name!: string;
    public Agen_NameOld!: string;
    public Kota!: string;
    public Sales_Name!: string;
    public SalesID!: string;
}

Agen.init({
    AgenID: {type:DataTypes.STRING},
    AgenID_Old: {type:DataTypes.STRING},
    Agen_Name: { type: DataTypes.STRING},
    Agen_NameOld: {type:DataTypes.STRING},
    Kota: {type:DataTypes.STRING},
    Sales_Name: {type:DataTypes.STRING},
    SalesID: {type:DataTypes.STRING}
}, {
    timestamps: false,
    sequelize: Sql,
});

export class Agen_NameVM {
    public Agen_Name!: string;
    
    constructor(agen: Agen) {
        this.Agen_Name = agen.Agen_Name;
    }
}

export class AgenVM {
    public AgenID!: string;
    public Agen_Name!: string;
    public Kota!: string;
    public Sales_Name!: string;
    public SalesID!: string;
    
    constructor(agen: Agen) {
        this.AgenID = agen.AgenID;
        this.Agen_Name = agen.Agen_Name;
        this.Kota = agen.Kota;
        this.SalesID = agen.SalesID;
        this.Sales_Name = agen.Sales_Name;
    }
}

export class SaveAgenVM {
    public AgenID!: string;
    public Agen_Name!: string;
    public Kota!: string;
    public SalesID!: string;

    constructor(agen: Agen) {
        this.AgenID = agen.AgenID;
        this.Agen_Name = agen.Agen_Name;
        this.Kota = agen.Kota;
        this.SalesID = agen.SalesID;
    }
}