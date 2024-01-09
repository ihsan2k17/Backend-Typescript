import { Sales } from "../../Database/Models/MSalesPerson";

interface ISalesRepository
{
    searchsales(key:string): Promise<Sales[]>
    getAllSales(): Promise<Sales[]>
    getnamaSales(): Promise<Sales[]>
    getSalesByName(namasales: string):Promise<Sales[]>
    getid(id:string): Promise<Sales[]>
    addSales(entity: Sales): Promise<Sales>
    updateSales(entity: Sales): Promise<void>
    delete(entity:Sales): Promise<void>
}
export default ISalesRepository;