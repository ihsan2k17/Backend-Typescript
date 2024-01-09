import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface IPeriode{
    Periode: number;
};

export class Periode extends Model<IPeriode>{
    public Periode!: number;
};

Periode.init({
    Periode: {
        type: DataTypes.INTEGER, allowNull: true, field: "Periode", defaultValue: "NULL"
    }
}, { timestamps: false, sequelize: Sql, tableName: "Periode" });

export class PeriodeVM{
    public Periode!: number;

    constructor (PRD:Periode) {
        this.Periode = PRD.Periode
    }
};

export class SavePeriodeVM{
    public Periode!: number;
    
    constructor (PRD:Periode) {
        this.Periode = PRD.Periode
    }
};

export interface IPeriodeTemp{
    Periode: number;
    Num: number;
};

export class PeriodeTemp extends Model<IPeriodeTemp>{
    public Periode!: number;
    public Num!: number;
};

PeriodeTemp.init({
    Periode: {
        type: DataTypes.INTEGER, allowNull: true, field: "Periode", defaultValue: "NULL"
    },
    Num: {
        type: DataTypes.INTEGER, allowNull: true, field: "Num", defaultValue: "NULL"
    }
}, { timestamps: false, sequelize: Sql, tableName: "PeriodeTemp" });