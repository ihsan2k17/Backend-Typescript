import { Customer, CustomerVM, SaveCustomerVM } from "../../Database/Models/MCustomers";

interface ICustomerService {
    getCountCustOrdCustomer(): Promise<CustomerVM[]>
    getAllCustByCust(Customer: string): Promise<CustomerVM[]>
    getIdCust(): Promise<CustomerVM[]>
    getKotaCust(): Promise<CustomerVM[]>
    getByAgenId(Id: number): Promise<null|CustomerVM[]>
    getCurrentCustbyCust(): Promise<CustomerVM[]>
    searchAllCust(search: string): Promise<CustomerVM[]>

    getTopCust(): Promise<CustomerVM[]>
    getIdCustById(Id: number): Promise<null|CustomerVM[]>
    addCust(entity: SaveCustomerVM): Promise<boolean | null>
    
    updateCust(Id: number, entity:SaveCustomerVM): Promise<boolean>
}

export default ICustomerService;