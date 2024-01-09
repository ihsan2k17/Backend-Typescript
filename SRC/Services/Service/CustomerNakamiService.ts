import { inject, injectable } from "inversify";
import ICustomerNakamiService from "../Interface/ICustomernakamiService";
import { IUnitOfWork } from "../../Repositories/Interface/iUnitOfWork";
import ICustomerNakami from "../../Repositories/Interface/ICustomerNakamiRepository";
import { Customer_Nakami, Customer_NakamiVM, SaveCustomer_NakamiVM } from "../../Database/Models/MCustomers_Nakami";

@injectable()
class CustomerNakamiService implements ICustomerNakamiService {
    private _unitofwork: IUnitOfWork;
    private _customernakami: ICustomerNakami;

    constructor(
        @inject("IUnitOfWork") unitofwork: IUnitOfWork,
        @inject("ICustomerNakami") customerNakamirepos: ICustomerNakami)
    {
        this._unitofwork = unitofwork;
        this._customernakami = customerNakamirepos;
    }


    async getCountCustOrdCustomer(): Promise<Customer_NakamiVM[]> {
        const countcust = await this._customernakami.getCountcustOrderCustomer();
        const list = countcust.map((cust: Customer_Nakami) => {
            const vm = new Customer_NakamiVM(cust);
            return vm;
        });
        return list;
    }
    async getAllCustByCust(Customer: string): Promise<Customer_NakamiVM[]> {
        const getall = await this._customernakami.getAllCustByCustomer(Customer);
        const list = getall.map((cust: Customer_Nakami) => {
            const vm = new Customer_NakamiVM(cust);
            return vm;
        });
        return list;
    }
    async getIdCust(): Promise<Customer_NakamiVM[]> {
        const selectid = await this._customernakami.getIdCust();
        const list = selectid.map((cust: Customer_Nakami) => {
            const vm = new Customer_NakamiVM(cust);
            return vm;
        });
        return list;
    }
    async getKotaCust(): Promise<Customer_NakamiVM[]> {
        const selectkota = await this._customernakami.getKotaCust();
        const list = selectkota.map((cust: Customer_Nakami) => {
            const vm = new Customer_NakamiVM(cust);
            return vm;
        });
        return list;
    }
    async getByAgenId(Id: number): Promise<Customer_NakamiVM[] | null> {
        if (!Id) {
            return null;
        };
        const getid = await this._customernakami.getAllCustJoinSalesAndAgenById(Id);
        const resp = getid.map((cust: Customer_Nakami) => {
            const vm = new Customer_NakamiVM(cust);
            return vm;
        });
        return resp;
    }
    async getCurrentCustbyCust(): Promise<Customer_NakamiVM[]> {
        const getcurrent = await this._customernakami.getCurrentCustbyCustomer();
        const list = getcurrent.map((cust: Customer_Nakami) => {
            const vm = new Customer_NakamiVM(cust);
            return vm;
        });
        return list;
    }
    async searchAllCust(search: string): Promise<Customer_NakamiVM[]> {
        const cek = await this._customernakami.searhAllCust(search);
        const list = cek.map((cust:Customer_Nakami) => {
            const vm = new Customer_NakamiVM(cust);
            return vm;
        });
        return list;
    }
    async getTopCust(): Promise<Customer_NakamiVM[]> {
        const cekcust = await this._customernakami.getTopCust();
        const cekList = cekcust.map((cust: Customer_Nakami) => {
            const vm = new Customer_NakamiVM(cust);
            return vm;
        });
        return cekList
    }
    async getIdCustById(Id: number): Promise<Customer_NakamiVM[] | null> {
        if (!Id) {
            return null
        };
        const cekId = await this._customernakami.getIdCustById(Id);
        const Cekdata = cekId.map((cust: Customer_Nakami) => {
            const vm = new Customer_NakamiVM(cust);
            return vm;
        });
        return Cekdata;
    }
    async addCust(entity: SaveCustomer_NakamiVM): Promise<boolean | null> {
        try {
            if (!entity) {
                throw new Error('Data tidak Ada');
            }
            await this._unitofwork.beginTransaction()
            const newCust = Object.assign(new Customer_Nakami(), {
                ID: entity.ID,
                Customer: entity.Customer,
                Nama: entity.Nama,
                Alamat: entity.Alamat,
                HP: entity.HP,
                Whatsapp: entity.Whatsapp,
                Email: entity.Email,
                AgenID: entity.AgenId,
                Status: entity.Status,
                SalesID: entity.SalesId,
                Kota: entity.Kota,
                Keterangan: entity.Keterangan,
                Jenis: entity.Jenis,
                User_Input: entity.User_Input

            });
            const add = await this._customernakami.addCust(newCust);
            await this._unitofwork.Save()
            const save: SaveCustomer_NakamiVM = new SaveCustomer_NakamiVM(add);
            return !!save;
        } catch (error) {
            await this._unitofwork.Dispose()
            throw error
        }
    }
    async updateCust(Id: number, entity: SaveCustomer_NakamiVM): Promise<boolean> {
        const getId = await this._customernakami.getIdCustById(Id)
        if (!getId) {
            throw new Error(""+ Id +" tidak tersedia");
        };
        try {
            await this._unitofwork.beginTransaction();
            const data: Customer_Nakami = Object.assign(new Customer_Nakami(), {
                Customer: entity.Customer,
                Nama: entity.Nama,
                Status: entity.Status,
                HP: entity.HP,
                Whatsapp: entity.Whatsapp,
                Email: entity.Email,
                AgenID: entity.AgenId,
                SalesID: entity.SalesId,
                Kota: entity.Kota,
                Alamat: entity.Alamat,
                Keterangan: entity.Keterangan,
                Id: entity.ID
            });
            await this._customernakami.updateCust(data);
            await this._unitofwork.Save();
            const simpan: SaveCustomer_NakamiVM = new SaveCustomer_NakamiVM(data);
            if (simpan) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error
        };
    }
}

export default CustomerNakamiService;