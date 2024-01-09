import { injectable } from "inversify";
import ICustomerNakami from "../Interface/ICustomerNakamiRepository";
import { Customer_Nakami } from "../../Database/Models/MCustomers_Nakami";
import Sql from "../../Database/Server/db_config";
import custNakamiQuery from "../../Database/query/customernakamiquery";
import { QueryTypes } from "sequelize";

@injectable()
class CustomerNakamiRepository implements ICustomerNakami{
    async getCountcustOrderCustomer(): Promise<Customer_Nakami[]> {
        const countcust = await Sql.query<Customer_Nakami>(
            custNakamiQuery.custgetCountcustOrderCustomer,
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
    async getAllCustByCustomer(Customer:string): Promise<Customer_Nakami[]> {
        const getall = await Sql.query<Customer_Nakami>(
            custNakamiQuery.custgetAllCustByCustomer,
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
    async searhAllCust(search:string): Promise<Customer_Nakami[]> {
        const searching = await Sql.query<Customer_Nakami>(custNakamiQuery.custsearhAllCust,{
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
    async getCurrentCustbyCustomer(): Promise<Customer_Nakami[]> {
        const getcurrent = await Sql.query<Customer_Nakami>(
            custNakamiQuery.custgetCurrentCustbyCustomer,{
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        if(!Array.isArray(getcurrent)) {
            throw new Error("Belum Ada Data");
        }
        return getcurrent;
    }
    async getIdCust(): Promise<Customer_Nakami[]> {
        const getid = await Sql.query<Customer_Nakami>(
            custNakamiQuery.custgetIdCust,
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
    async getKotaCust(): Promise<Customer_Nakami[]> {
        const getkota = await Sql.query<Customer_Nakami>(
            custNakamiQuery.custgetKotaCust,
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        if (!Array.isArray(getkota)) {
            throw new Error("Data tidak ada");
        }
        return getkota;
    }
    async getAllCustJoinSalesAndAgenById(Id: number): Promise<Customer_Nakami[]> {
        const getjoinId = await Sql.query<Customer_Nakami>(
            custNakamiQuery.custgetAllCustJoinSalesAndAgenById,
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
    async getTopCust(): Promise<Customer_Nakami[]> {
        const top = await Sql.query<Customer_Nakami>(
            custNakamiQuery.custgetTopCust,
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            }
        );
        return top;
    }
    async getIdCustById(ID: number): Promise<Customer_Nakami[]> {
        const getbyid = await Sql.query<Customer_Nakami>(
            custNakamiQuery.custgetIdCustById,
            {
                replacements: { id: ID },
                type: QueryTypes.SELECT,
                mapToModel: true,
                raw: true
            });
        return getbyid;
    }
    async addCust(entity: Customer_Nakami): Promise<Customer_Nakami> {
        await Sql.query(
            custNakamiQuery.custaddCust,
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
    async updateCust(entity: Customer_Nakami): Promise<void> {
        await Sql.query(
            custNakamiQuery.custupdateCust, {
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

export default CustomerNakamiRepository;