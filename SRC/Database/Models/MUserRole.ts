import { DataTypes, Model } from "sequelize";
import Sql from "../Server/db_config";

export interface IUserRole{
    Role: string;
};

export class UserRole extends Model<IUserRole>{
    public Role!: string;
};

UserRole.init({
    Role: {
        type: DataTypes.STRING, allowNull: true, field: "Role", defaultValue: "NULL"
    }
}, {
    timestamps: false, sequelize: Sql, tableName: "UserRole"
});