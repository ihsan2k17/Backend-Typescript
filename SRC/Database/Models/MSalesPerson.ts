import{ DataTypes, Model} from "sequelize";
import Sql from "../Server/db_config";

export interface ISales
{
    SalesID:string;
    Sales_Name: string;
    Sales_NameOld: string;
}

export class Sales extends Model<ISales>{
    public SalesID?: string;
    public Sales_Name!: string;
    public Sales_NameOld!: string;

}
Sales.init(
    {
        SalesID: {type:DataTypes.STRING, primaryKey:true},
        Sales_Name: {type:DataTypes.STRING},
        Sales_NameOld: {type: DataTypes.STRING},
    },
    {
        timestamps: false,
        sequelize: Sql,
    }
)
export class SalesVM {
    public SalesID?: string;
    public Sales_Name!: string;

    constructor(sales: Sales) {
        this.SalesID = sales.SalesID;
        this.Sales_Name = sales.Sales_Name;
    }
}

export class SaveSalesVM {
    public SalesID?: string;
    public Sales_Name!: string;

    constructor(sales: Sales) {
        this.SalesID = sales.SalesID;
        this.Sales_Name = sales.Sales_Name;
    }
}