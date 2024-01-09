import { inject, injectable } from "inversify";
import ICustomerService from "../Interface/ICustomerService";
import { Customer, CustomerVM, SaveCustomerVM } from "../../Database/Models/MCustomers";
import { IUnitOfWork } from "../../Repositories/Interface/iUnitOfWork";
import ICustomerRepository from "../../Repositories/Interface/ICustomerRepository";

const os = require('os');

@injectable()
class CustomerService implements ICustomerService{
    private _unitofwork: IUnitOfWork;
    private _customer: ICustomerRepository;

    constructor(@inject("IUnitOfWork") unitofwork: IUnitOfWork,
        @inject("ICustomerRepository") customerrepos: ICustomerRepository)
    {
        this._unitofwork = unitofwork;
        this._customer = customerrepos;
    }

    async getCountCustOrdCustomer(): Promise<CustomerVM[]> {
        const countcust = await this._customer.getCountcustOrderCustomer();
        const list = countcust.map((cust: Customer) => {
            const vm = new CustomerVM(cust);
            return vm;
        });
        return list;
    }

    async getAllCustByCust(Customer:string): Promise<CustomerVM[]> {
        const getall = await this._customer.getAllCustByCustomer(Customer);
        const list = getall.map((cust: Customer) => {
            const vm = new CustomerVM(cust);
            return vm;
        });
        return list;
    }

    async searchAllCust(search: string): Promise<CustomerVM[]> {
        const cek = await this._customer.searhAllCust(search);
        const list = cek.map((cust:Customer) => {
            const vm = new CustomerVM(cust);
            return vm;
        });
        return list;
    }

    async getCurrentCustbyCust(): Promise<CustomerVM[]> {
        const getcurrent = await this._customer.getCurrentCustbyCustomer();
        const list = getcurrent.map((cust: Customer) => {
            const vm = new CustomerVM(cust);
            return vm;
        });
        return list;
    }

    async getIdCust(): Promise<CustomerVM[]> {
        const selectid = await this._customer.getIdCust();
        const list = selectid.map((cust: Customer) => {
            const vm = new CustomerVM(cust);
            return vm;
        });
        return list;
    }

    async getKotaCust(): Promise<CustomerVM[]> {
        const selectkota = await this._customer.getKotaCust();
        const list = selectkota.map((cust: Customer) => {
            const vm = new CustomerVM(cust);
            return vm;
        });
        return list;
    }

    async getByAgenId(Id: number): Promise<null | CustomerVM[]> {
        if (!Id) {
            return null;
        };
        const getid = await this._customer.getAllCustJoinSalesAndAgenById(Id);
        const resp = getid.map((cust: Customer) => {
            const vm = new CustomerVM(cust);
            return vm;
        });
        return resp;
    }

    async getTopCust(): Promise<CustomerVM[]> {
        const cekcust = await this._customer.getTopCust();
        const cekList = cekcust.map((cust: Customer) => {
            const vm = new CustomerVM(cust);
            return vm;
        });
        return cekList
    }
    
    async getIdCustById(Id: number): Promise<null | CustomerVM[]> {
        if (!Id) {
            return null
        };
        const cekId = await this._customer.getIdCustById(Id);
        const Cekdata = cekId.map((cust: Customer) => {
            const vm = new CustomerVM(cust);
            return vm;
        });
        return Cekdata;

    }

    async addCust(entity: SaveCustomerVM): Promise<boolean | null> {
        try {
            if (!entity) {
                throw new Error('Data tidak Ada');
            }
            const newCust = Object.assign(new Customer(), {
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
            const add = await this._customer.addCust(newCust);
            const save: SaveCustomerVM = new SaveCustomerVM(add);
            return !!save;
        } catch (error) {
            throw error
        }
    }

    async updateCust(Id: number, entity: SaveCustomerVM): Promise<boolean> {
        const getId = await this._customer.getIdCustById(Id)
        if (!getId) {
            throw new Error(""+ Id +" tidak tersedia");
        };
        try {
            await this._unitofwork.beginTransaction();
            const data: Customer = Object.assign(new Customer(), {
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
            await this._customer.updateCust(data);
            await this._unitofwork.Save();
            const simpan: SaveCustomerVM = new SaveCustomerVM(data);
            if (simpan) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            await this._unitofwork.Dispose();
            throw error
        };
    };
};

export default CustomerService;