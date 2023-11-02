import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface IJenis {
    Jenis: string;
};

export class Jenis extends Model<IJenis>{
    public Jenis!: string;
};

Jenis.init({
    Jenis: {
        type: DataTypes.STRING, allowNull: true, field: "Jenis", defaultValue: "NULL"
    }
}, {
    timestamps: false,
    sequelize: Sql,
    tableName: "Jenis"
});