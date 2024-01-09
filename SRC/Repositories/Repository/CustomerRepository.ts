import { injectable } from "inversify";
import ICustomerRepository from "../Interface/ICustomerRepository";
import { Customer } from "../../Database/Models/MCustomers";
import Sql from "../../Database/Server/db_config";
import { QueryTypes } from "sequelize";
import custQuery from "../../Database/query/customerquery";

@injectable()
class CustomerRepository implements ICustomerRepository {
    async getCountcustOrderCustomer(): Promise<Customer[]> {
        const countcust = await Sql.query<Customer>(
            custQuery.custgetCountcustOrderCustomer,
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        if (!Array.isArray(countcust)) {
            throw new Error("Data tidak ditemukan");
        }
        return countcust;
    }
    
    async getAllCustByCustomer(Customer: string): Promise<Customer[]> {
        const getall = await Sql.query<Customer>(
            custQuery.custgetAllCustByCustomer,
            {
                replacements:{namacust:Customer },
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        if (!Array.isArray(getall)) {
            throw new Error("Data tidak Ditemukan");
        }
        return getall;
    }

    async searhAllCust(search: string): Promise<Customer[]> {
        const searching = await Sql.query<Customer>(custQuery.custsearhAllCust,{
            replacements: {
                cust: `%${search}%`,
                nama: `%${search}%`,
                email:`%${search}%`
            },
            type: QueryTypes.SELECT,
            raw:true
        });
        return searching;
    }

    async getCurrentCustbyCustomer(): Promise<Customer[]> {
        const getcurrent = await Sql.query<Customer>(
            custQuery.custgetCurrentCustbyCustomer,{
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        if(!Array.isArray(getcurrent)) {
            throw new Error("Belum Ada Data");
        }
        return getcurrent;
    }

    async getIdCust(): Promise<Customer[]> {
        const getid = await Sql.query<Customer>(
            custQuery.custgetIdCust,
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        if (!Array.isArray(getid)) {
            throw new Error("Data tidak ada");
        }
        return getid;
    }

    async getKotaCust(): Promise<Customer[]> {
        const getkota = await Sql.query<Customer>(
            custQuery.custgetKotaCust,
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        if (!Array.isArray(getkota)) {
            throw new Error("Data tidak ditemukan");
        }
        return getkota;
    }

    async getAllCustJoinSalesAndAgenById(Id: number): Promise<Customer[]> {
        const getjoinId = await Sql.query<Customer>(
            custQuery.custgetAllCustJoinSalesAndAgenById,
            {
                replacements: { id: Id },
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        if (!Array.isArray(getjoinId)) {
            throw new Error("Data tidak Ditemukan");
        }
        return getjoinId;
    }

    async getTopCust(): Promise<Customer[]> {
        const top = await Sql.query<Customer>(
            custQuery.custgetTopCust,
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            }
        );
        return top;
    }

    async getIdCustById(ID: number): Promise<Customer[]> {
        const getbyid = await Sql.query<Customer>(
            custQuery.custgetIdCustById,
            {
                replacements: { id: ID },
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        return getbyid;
    }
    async addCust(entity: Customer): Promise<Customer> {
        await Sql.query(
            custQuery.custaddCust,
            {
                replacements: {
                    id: entity.ID,
                    customer: entity.Customer,
                    nama: entity.Nama,
                    alamat: entity.Alamat,
                    hp: entity.HP,
                    wa: entity.Whatsapp,
                    email: entity.Email,
                    agenid: entity.AgenID,
                    status: entity.Status,
                    salesid: entity.SalesID,
                    kota: entity.Kota,
                    keterangan: entity.Keterangan,
                    jenis: entity.Jenis,
                    User_Input:entity.User_Input,
                },
                type: QueryTypes.INSERT,
                raw:true
        });
        return entity;
    }

    async updateCust(entity: Customer): Promise<void> {
        await Sql.query(
            custQuery.custupdateCust, {
            replacements: {
                cust: entity.Customer,
                nama: entity.Nama,
                status: entity.Status,
                hp: entity.HP,
                wa: entity.Whatsapp,
                email: entity.Email,
                agenid: entity.AgenID,
                salesid: entity.SalesID,
                kota: entity.Kota,
                alamat: entity.Alamat,
                keterangan: entity.Keterangan,
                id: entity.ID
            },
            type: QueryTypes.UPDATE,
            raw: true
        });
    }
}

export default CustomerRepository;