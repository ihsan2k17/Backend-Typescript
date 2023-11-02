import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface ITahun{
    Tahun: string;
    Num: number;
}

export class Tahun extends Model<ITahun>{
    public Tahun?: string;
    public Num!: number;
}

Tahun.init({
    Tahun: {
        type:DataTypes.STRING, allowNull:true, field:"Tahun", defaultValue:"NULL"
    },
    Num: {
        type:DataTypes.INTEGER, allowNull:true, field:"Num", defaultValue:"NULL"
    }
},{timestamps:false, sequelize:Sql, tableName:"Tahun"})