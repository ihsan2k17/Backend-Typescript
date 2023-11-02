import { injectable } from "inversify";
import { IUnitOfWork } from "../Interface/iUnitOfWork";
import { Sequelize, Transaction } from "sequelize";
import Sql from "../../Database/Server/db_config";

@injectable()
class UnitOfWork implements IUnitOfWork{

    private _sequelize!: Sequelize;
    private _transaction!: Transaction;

    constructor() {
        this._sequelize! = Sql;
    };

    async beginTransaction(): Promise<void> {
        this._transaction = await this._sequelize.transaction();
    }
    async Save(): Promise<void> {
        await this._transaction.commit();
    }
    async Dispose(): Promise<void> {
        await this._transaction.rollback()
    }
    
    async openConnection(): Promise<void> {
        await this._sequelize.authenticate();
        console.log("Connected to the database");
    }

    async closeConnection(): Promise<void> {
        await this._sequelize.close();
        console.log("Connection to the database closed");
    }

};  
export default UnitOfWork;