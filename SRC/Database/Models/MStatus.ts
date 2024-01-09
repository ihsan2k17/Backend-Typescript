import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface IStatus{
    Status: string;
};

export class Status extends Model<IStatus>{
    public Status!: string;
};

Status.init({
    Status: {
        type:DataTypes.STRING, allowNull:true, field:"Status", defaultValue:"NULL"
    }
}, {
    timestamps: false, sequelize: Sql, tableName:"Status"
})