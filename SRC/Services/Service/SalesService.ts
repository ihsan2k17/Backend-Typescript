import { inject, injectable } from "inversify";
import { Response } from "express";
import { Sales, SalesVM, SaveSalesVM } from "../../Database/Models/MSalesPerson";
import ISalesRepository from "../../Repositories/Interface/ISalesRepository";
import InterfaceSalesService from "../Interface/InSalesService";
import { STRING, where } from "sequelize";
import Sql from "../../Database/Server/db_config";
import { IUnitOfWork } from "../../Repositories/Interface/iUnitOfWork";

@injectable()
class SalesServ implements InterfaceSalesService {
    private _unitofwork : IUnitOfWork
    private _salesRepository: ISalesRepository
    
    constructor(
        @inject("IUnitOfWork") unitofwork: IUnitOfWork,
        @inject("ISalesRepository") salesRepository: ISalesRepository)
    {
        this._unitofwork = unitofwork;
        this._salesRepository = salesRepository;
    }


    async searchSales(key:string):Promise<SalesVM[]> {
        const getsearc = await this._salesRepository.searchsales(key);
        const src = getsearc.map((sales: Sales) => {
            const vm = new SalesVM(sales);
            return vm
        })
        return src;
    }
    
    async getAllSales() {
        const getall = await this._salesRepository.getAllSales();
        const list = getall.map((sales: Sales) => {
            const VM = new SalesVM(sales);
            return VM;
        });
        return list;
    }

    async getNamaSales():Promise<SalesVM[]> {
        const getall = await this._salesRepository.getnamaSales();
        const list = getall.map((sales: Sales) => {
            const VM = new SalesVM(sales);
            return VM;
        });
        return list;
    }

    async addSales(entity: SaveSalesVM): Promise<boolean> {
        try {
            if (!entity) {
                throw new Error("belom ada data");
                
            };
            const newsales: Sales = Object.assign(new Sales(), {
                SalesID: entity.SalesID,
                Sales_Name: entity.Sales_Name
            });

            const add = await this._salesRepository.addSales(newsales);
            const save: SaveSalesVM = new SaveSalesVM(add);
            return !!save;
        } catch (error) {
            throw error;
        }
    }


    async updateSales(namasales: string, entity: SaveSalesVM) {
        const transaction = await  Sql.transaction()
        const getnama = await this._salesRepository.getSalesByName(namasales)
        if (getnama.length === 0) {
            throw new Error(`nama ${namasales} tidak ditemukan`);
        }
        const ubah: Sales = Object.assign(new Sales(), {
            SalesID: entity.SalesID,
            Sales_Name: entity.Sales_Name,
            Sales_NameOld: namasales,
        });
        await this._salesRepository.updateSales(ubah);
        await transaction.commit();
        const mapping: SaveSalesVM = new SaveSalesVM(ubah);
        return mapping;
    }

    async delete(id: string): Promise<SaveSalesVM> {
        const transaction = await Sql.transaction()
        const getid = await this._salesRepository.getid(id);
        if (getid.length === 0) {
            throw new Error(`id ${id} tidak ditemukan`);
        }
        const ubah: Sales = Object.assign(new Sales(), {
            SalesID: id
        });
        await this._salesRepository.delete(ubah);
        await transaction.commit();
        const mapping: SaveSalesVM = new SaveSalesVM(ubah);
        return mapping;
    }

}
export default SalesServ;