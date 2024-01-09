import { Customer_NakamiVM, SaveCustomer_NakamiVM } from "../../Database/Models/MCustomers_Nakami"

interface ICustomerNakamiService {
    getCountCustOrdCustomer(): Promise<Customer_NakamiVM[]>
    getAllCustByCust(Customer: string): Promise<Customer_NakamiVM[]>
    getIdCust(): Promise<Customer_NakamiVM[]>
    getKotaCust(): Promise<Customer_NakamiVM[]>
    getByAgenId(Id: number): Promise<null|Customer_NakamiVM[]>
    getCurrentCustbyCust(): Promise<Customer_NakamiVM[]>
    searchAllCust(search: string): Promise<Customer_NakamiVM[]>

    getTopCust(): Promise<Customer_NakamiVM[]>
    getIdCustById(Id: number): Promise<null|Customer_NakamiVM[]>
    addCust(entity: SaveCustomer_NakamiVM): Promise<boolean | null>
    
    updateCust(Id: number, entity:SaveCustomer_NakamiVM): Promise<boolean>
}

export default ICustomerNakamiService;