import { Customer_Nakami } from "../../Database/Models/MCustomers_Nakami";

interface ICustomerNakami {
    getCountcustOrderCustomer():Promise<Customer_Nakami[]>;
    getAllCustByCustomer(Customer:string): Promise<Customer_Nakami[]>;
    searhAllCust(search:string):Promise<Customer_Nakami[]>;
    getCurrentCustbyCustomer():Promise<Customer_Nakami[]>;
    getIdCust():Promise<Customer_Nakami[]>;
    getKotaCust(): Promise<Customer_Nakami[]>;
    getAllCustJoinSalesAndAgenById(Id: number): Promise<Customer_Nakami[]>;
    getTopCust(): Promise<Customer_Nakami[]>;
    getIdCustById(ID: number): Promise<Customer_Nakami[]>;
    addCust(entity: Customer_Nakami): Promise<Customer_Nakami>;
    updateCust(entity: Customer_Nakami): Promise<void>
}

export default ICustomerNakami;