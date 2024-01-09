import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface IhadiahKe {
    Hadiah_Ke: number;
}

export class Hadiahke extends Model<IhadiahKe>{
    public Hadiah_Ke?:number
}

Hadiahke.init({
    Hadiah_Ke: {
        type:DataTypes.INTEGER, allowNull:true, field:"Hadiah_Ke", defaultValue:"NULL"
    }
}, {
    timestamps: false,
    sequelize: Sql,
    tableName: "Hadiah_Ke"
})

export class HadiahKeVM {
    public Hadiah_Ke?: number

    constructor(hdhke: Hadiahke) {
        this.Hadiah_Ke = hdhke.Hadiah_Ke;
    };
};

export class SaveHadiahKeVM {
    public Hadiah_Ke?: number

    constructor(hdhke: Hadiahke) {
        this.Hadiah_Ke = hdhke.Hadiah_Ke;
    };
};