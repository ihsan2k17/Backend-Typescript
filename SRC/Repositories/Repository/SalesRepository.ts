import 'reflect-metadata';
import { injectable } from "inversify/lib/annotation/injectable";
import { Sales } from "../../Database/Models/MSalesPerson";
import ISalesRepository from '../Interface/ISalesRepository';
import Sql from '../../Database/Server/db_config';
import { Model, QueryTypes } from 'sequelize';
import salesQuery from '../../Database/query/salesquery';


@injectable()
class SalesRepository implements ISalesRepository{

    async searchsales(key:string): Promise<Sales[]> {
        const getdata = await Sql.query(
            salesQuery.searchsales, {
            replacements: {
                username: `%${key}%`,
                id: `%${key}%`,
            },
            type: QueryTypes.SELECT,
            model: Sales,
            mapToModel: true,
            raw: true
        })
        console.log(getdata);
        return getdata;
    }
    
    async getAllSales(): Promise<Sales[]> {
        const getdata = await Sql.query<Sales>(
            salesQuery.getAllSales,
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            }
        );
        return getdata;
    }
    async getnamaSales(): Promise<Sales[]> {
        const getdata = await Sql.query<Sales>(
            salesQuery.getnamaSales,
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw:true
            });
        return getdata;
    }
    async getSalesByName(namasales: string): Promise<Sales[]> {
        const getdata = await Sql.query<Sales>(
            salesQuery.getSalesByName, {
            replacements: { nama: namasales },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        })
        return getdata
    }

    async getid(id: string): Promise<Sales[]> {
        const getdata = await Sql.query<Sales>(
            salesQuery.getid, {
            replacements: { id: id },
            type: QueryTypes.SELECT,
            mapToModel: true,
            raw: true
        });
        if (!getdata || getdata.length === 0) {
            throw new Error(`Id Sales = ${id} tidak dapat ditemukan`);
        }
        return getdata;
    }

    async addSales(entity: Sales): Promise<Sales> {
        const adddata = await Sql.query(salesQuery.addSales, {
            replacements: {
                id: entity.SalesID,
                namasales: entity.Sales_Name
            },
            type: QueryTypes.INSERT,
            raw: true
        });
        console.log(adddata)
        return entity
    }

    async updateSales(entity: Sales): Promise<void> {
        const OldSales = entity.Sales_NameOld;
        entity.Sales_NameOld = entity.Sales_NameOld || entity.Sales_Name;
        await Sql.query(salesQuery.updateSales,
            {
                replacements: {
                    id: entity.SalesID,
                    namasales: entity.Sales_Name,
                    namasalesOld: OldSales
                },
                type: QueryTypes.UPDATE,
                mapToModel: true,
                raw: true
            });
    }

    async delete(entity: Sales): Promise<void> {
        await Sql.query(salesQuery.delete, {
            replacements: { id: entity.SalesID },
            type: QueryTypes.DELETE,
            mapToModel: true,
            raw: true
        });
    }
}

export default SalesRepository;