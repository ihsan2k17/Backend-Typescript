import { Customer } from "../../Database/Models/MCustomers";

interface ICustomerRepository {
    getCountcustOrderCustomer(): Promise<Customer[]>
    /* untuk melihat semua data Customer berdasarkan nama customer dan jika id nya banyak akan membentuk sebuah list id berdasarkan customer */
    getAllCustByCustomer(Customer: string): Promise<Customer[]>
    getIdCust(): Promise<Customer[]>
    getKotaCust(): Promise<Customer[]>
    /* untuk melihat data customer berdasarkan id customer */
    getAllCustJoinSalesAndAgenById(Id: number): Promise<Customer[]>
    /* untuk melihat apakah customer baru sudah terinput atau belum */
    getCurrentCustbyCustomer(): Promise<Customer[]>
    /* untuk mencari nama customer */
    searhAllCust(search:string) : Promise<Customer[]>

    /* untuk create customer baru */
    getTopCust():Promise<Customer[]> /* untuk mengambil id terbaru karena tidak menggunakan auto increment emang sedikit aneh sih hehehe */
    getIdCustById(ID:number):Promise<Customer[]> /* untuk melihat id customer berdasarkan id, function ini di gunakan pada saat user menginput kupon/voucher */
    addCust(entity: Customer): Promise<Customer>

    /* update cust */
    updateCust(entity: Customer): Promise<void>
}

export default ICustomerRepository;